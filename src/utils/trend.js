// =====================================================================
//  trend.js — WELK LABEL HOORT BIJ HET VERLOOP VAN DE INTENSITEIT?
//  Alle instellingen komen uit TREND in config.js.
// =====================================================================

// Gemiddelde van een lijst getallen.
export function mean(list) {
  if (list.length === 0) return 0;
  return list.reduce((sum, v) => sum + v, 0) / list.length;
}

// Helling van de best passende rechte lijn door een lijst getallen
// (lineaire regressie, "kleinste kwadraten").
// De punten liggen op x = 0, 1, 2, ... De helling is: hoeveel de waarde
// gemiddeld stijgt per stap. Positief = stijgend, negatief = dalend.
export function linearSlope(list) {
  const n = list.length;
  if (n < 2) return 0;
  const meanX = (n - 1) / 2;
  const meanY = mean(list);
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < n; i++) {
    numerator += (i - meanX) * (list[i] - meanY);
    denominator += (i - meanX) * (i - meanX);
  }
  return numerator / denominator;
}

// Bepaalt het label op basis van de intensiteitsgeschiedenis.
//
//  values        -> intensiteit per punt, oudste eerst, nieuwste laatst
//  cfg           -> TREND uit config.js
//  bucketSeconds -> hoeveel seconden één punt is (INTENSITY.bucketSeconds)
//
//  Geeft terug: { key, slope, diff }
//   key   -> "measuring" | "spike" | "dip" | "increasing" | "decreasing" | "stable"
//   slope -> berekende helling (per seconde), voor de debug-weergave
//   diff  -> verschil recent - basis, voor de debug-weergave
export function determineTrend(values, cfg, bucketSeconds) {
  const toPoints = (seconds) =>
    Math.max(1, Math.round(seconds / bucketSeconds));
  const n = values.length;

  // 1. Te weinig data? Dan nog geen oordeel.
  if (n < toPoints(cfg.minDataSeconds)) {
    return { key: "measuring", slope: 0, diff: 0 };
  }

  // 2. Piek of dip: recent gemiddelde vergelijken met de periode daarvoor.
  const recentN = toPoints(cfg.spike.recentSeconds);
  const baseN = toPoints(cfg.spike.baselineSeconds);
  let diff = 0;
  if (n >= recentN + baseN) {
    const recent = mean(values.slice(-recentN));
    const base = mean(values.slice(-(recentN + baseN), -recentN));
    diff = recent - base;
  }

  // 3. Helling over het trendvenster, omgerekend naar "per seconde".
  const trendN = toPoints(cfg.trendWindowSeconds);
  const slope = linearSlope(values.slice(-trendN)) / bucketSeconds;

  // 4. Label kiezen. Piek en dip gaan voor, want die zijn het belangrijkst.
  let key;
  if (diff >= cfg.spike.minIncrease) key = "spike";
  else if (-diff >= cfg.spike.minDecrease) key = "dip";
  else if (slope > cfg.slopeThreshold) key = "increasing";
  else if (slope < -cfg.slopeThreshold) key = "decreasing";
  else key = "stable";

  return { key, slope, diff };
}
