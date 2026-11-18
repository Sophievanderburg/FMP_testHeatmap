// =====================================================================
//  parseLine.js — EEN REGEL VAN DE ESP32 OMZETTEN NAAR GETALLEN
//
//  De ESP32 stuurt regels zoals:   C0:123,C1:456,C2:789
//  Deze functie maakt daarvan:      { 0: 123, 1: 456, 2: 789 }
//  (kanaalnummer -> meetwaarde)
// =====================================================================

export function parseLine(line) {
  const result = {};
  if (!line) return result; // Lege regel: niets te doen.

  for (const part of line.split(",")) {    // ["C0:123", "C1:456", ...]
    const [name, raw] = part.split(":");   // "C0" en "123"
    if (!name || raw === undefined) continue;

    const channel = parseInt(name.replace("C", ""), 10); // "C0"  -> 0
    const value = parseInt(raw, 10);                     // "123" -> 123

    // Alleen opslaan als beide echte getallen zijn (geen half ontvangen tekst).
    if (!isNaN(channel) && !isNaN(value)) {
      result[channel] = value;
    }
  }
  return result;
}
