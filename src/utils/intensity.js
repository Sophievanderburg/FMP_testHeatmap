// =====================================================================
//  intensity.js — HOEVEEL IS ER VERANDERD SINDS DE VORIGE METING?
// =====================================================================

// Telt op hoeveel alle sensoren veranderd zijn tussen twee metingen.
//
//  values         -> nieuwe meting,  bijv. { 0: 500, 1: 1200, 2: 30 }
//  prevValues     -> vorige meting,  bijv. { 0: 480, 1: 1500, 2: 25 }
//  sensors        -> SENSORS uit config.js (welke kanalen meetellen)
//  noiseThreshold -> kleinere veranderingen worden als ruis genegeerd
//
//  Voorbeeld hierboven met noiseThreshold 30:
//   C0: |500-480|  = 20  -> kleiner dan 30, telt niet mee
//   C1: |1200-1500| = 300 -> telt mee
//   C2: |30-25|    = 5   -> telt niet mee
//   Resultaat: 300
export function frameDelta(values, prevValues, sensors, noiseThreshold) {
  let total = 0;
  for (const s of sensors) {
    const now = values[s.channel];
    const before = prevValues[s.channel];
    if (now === undefined || before === undefined) continue; // nog geen data

    const change = Math.abs(now - before); // Math.abs = altijd positief
    if (change >= noiseThreshold) total += change;
  }
  return total;
}
