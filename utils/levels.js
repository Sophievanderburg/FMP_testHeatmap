// =====================================================================
//  levels.js — VAN MEETWAARDE NAAR KLEUR
//  Een "pure" functie: zelfde invoer geeft altijd dezelfde uitvoer.
//  Daardoor is hij makkelijk te testen en overal te hergebruiken
//  (straks ook in de heatmap).
// =====================================================================
import { LEVELS } from "../config.js";

// Geeft het niveau (kleur + naam) terug dat bij een meetwaarde hoort.
// Voorbeeld: levelFor(800) -> { max: 1500, color: "#22C55E", label: "Weinig druk" }
export function levelFor(value) {
  return LEVELS.find((level) => value < level.max);
}
