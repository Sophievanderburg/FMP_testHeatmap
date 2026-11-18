// =====================================================================
//  useMovementIntensity.js — BEWEGINGSINTENSITEIT + TRENDLABEL BIJHOUDEN
//
//  Krijgt de live meetwaarden binnen en geeft terug:
//    history -> lijst met punten [{ time, value }, ...] (max. 5 minuten)
//    trend   -> het huidige label, bijv. "stable" (zie TREND.labels)
//    stats   -> de getallen achter het label (voor de debug-weergave)
//
//  Stappen:
//   1. Bij elke nieuwe meting: verandering t.o.v. vorige meting optellen
//      in een "emmertje" (bucket).
//   2. Elke seconde: emmertje als punt in de geschiedenis zetten, leegmaken.
//   3. Na elk nieuw punt: trendlabel opnieuw bepalen (met rust-regels).
// =====================================================================
import { useEffect, useRef, useState } from "react";
import { SENSORS, INTENSITY, TREND } from "../config.js";
import { frameDelta } from "../utils/intensity.js";
import { determineTrend } from "../utils/trend.js";

export function useMovementIntensity(values) {
  // useRef = een "doosje" dat een waarde onthoudt ZONDER dat de pagina
  // opnieuw getekend wordt als die verandert. Handig voor tussenstanden.
  const prevValuesRef = useRef(null); // vorige meting
  const bucketRef = useRef(0); // opgetelde veranderingen deze seconde
  const labelRef = useRef({ key: null, since: 0 }); // huidig label + sinds wanneer

  // useState = waarden die WEL op het scherm komen.
  const [history, setHistory] = useState([]);
  const [trend, setTrend] = useState("measuring");
  const [stats, setStats] = useState({ slope: 0, diff: 0, last: 0 });

  // --- Stap 1: bij elke nieuwe meting de verandering optellen ---
  useEffect(() => {
    if (Object.keys(values).length === 0) return; // nog geen data
    if (prevValuesRef.current) {
      bucketRef.current += frameDelta(
        values,
        prevValuesRef.current,
        SENSORS,
        INTENSITY.noiseThreshold,
      );
    }
    prevValuesRef.current = values;
  }, [values]);

  // --- Stap 2: elke seconde een punt toevoegen ---
  useEffect(() => {
    const maxPoints = Math.round(
      INTENSITY.windowSeconds / INTENSITY.bucketSeconds,
    );

    const timer = setInterval(() => {
      if (prevValuesRef.current === null) return; // nog niet verbonden
      const point = { time: Date.now(), value: bucketRef.current };
      bucketRef.current = 0; // emmertje leeg voor de volgende seconde
      // Punt toevoegen en alleen de laatste 'maxPoints' bewaren.
      setHistory((prev) => [...prev, point].slice(-maxPoints));
    }, INTENSITY.bucketSeconds * 1000);

    // Opruimen als het component verdwijnt (anders blijft de timer lopen).
    return () => clearInterval(timer);
  }, []);

  // --- Stap 3: na elk nieuw punt het trendlabel bepalen ---
  useEffect(() => {
    if (history.length === 0) return;

    const result = determineTrend(
      history.map((p) => p.value),
      TREND,
      INTENSITY.bucketSeconds,
    );
    setStats({
      slope: result.slope,
      diff: result.diff,
      last: history[history.length - 1].value,
    });

    // Rust-regels: een label mag pas wisselen als het lang genoeg stond.
    const now = Date.now();
    const current = labelRef.current;
    if (result.key === current.key) return; // niets veranderd

    const isAlert = current.key === "spike" || current.key === "dip";
    const holdSeconds = isAlert
      ? TREND.spikeHoldSeconds
      : TREND.minLabelSeconds;
    const secondsShown = (now - current.since) / 1000;

    if (
      current.key === null ||
      current.key === "measuring" ||
      secondsShown >= holdSeconds
    ) {
      labelRef.current = { key: result.key, since: now };
      setTrend(result.key);
    }
  }, [history]);

  return { history, trend, stats };
}
