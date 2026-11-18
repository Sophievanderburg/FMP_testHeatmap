// =====================================================================
//  levels.js — VAN MEETWAARDE NAAR KLEUR
//  "Pure" functies: zelfde invoer geeft altijd dezelfde uitvoer.
// =====================================================================
import { LEVELS } from "../config.js";

// Geeft het niveau (kleur + naam) terug dat bij een meetwaarde hoort.
// Voorbeeld: levelFor(800) -> { max: 1500, color: "#22C55E", label: "Weinig druk" }
export function levelFor(value) {
  return LEVELS.find((level) => value < level.max);
}

// Vloeiende kleur voor de "smooth"-modus.
// Zet een waarde om naar een kleur op de kleurencirkel:
//   0         -> blauw (tint 240)
//   maxValue  -> rood  (tint 0)
// en alles daartussen (via groen en geel).
export function smoothColor(value, maxValue) {
  const t = Math.min(Math.max(value / maxValue, 0), 1); // 0 t/m 1, nooit erbuiten
  const hue = 240 * (1 - t);
  return `hsl(${hue}, 85%, 55%)`;
}
