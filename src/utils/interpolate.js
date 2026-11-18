// =====================================================================
//  interpolate.js — DE DRUK SCHATTEN OP PLEKKEN ZONDER SENSOR
//
//  Methode: Inverse Distance Weighting (IDW).
//  Idee: de geschatte waarde op een punt is een gewogen gemiddelde van
//  alle sensoren. Hoe DICHTER een sensor bij het punt ligt, hoe ZWAARDER
//  hij meetelt.
//
//      gewicht  = 1 / afstand^power
//      waarde   = som(gewicht × sensorwaarde) / som(gewicht)
//
//  Voorbeeld: een punt precies tussen twee sensoren (500 en 1500) krijgt
//  ongeveer 1000. Een punt vlak naast de sensor van 1500 krijgt bijna 1500.
// =====================================================================

// x, y   -> het punt waarvoor we de waarde willen weten (in pixels)
// points -> lijst met sensoren: [{ x, y, value }, ...] (ook in pixels)
// power  -> hoe sterk de afstand meetelt (zie HEATMAP.power in config.js)
export function idwValue(x, y, points, power) {
  let weightedSum = 0; // som van (gewicht × waarde)
  let weightTotal = 0; // som van alle gewichten

  for (const p of points) {
    const dx = x - p.x;
    const dy = y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy); // Stelling van Pythagoras

    // Ligt het punt (bijna) precies op een sensor? Dan is de waarde gewoon
    // die van de sensor. (Anders zouden we delen door 0.)
    if (distance < 0.0001) return p.value;

    const weight = 1 / Math.pow(distance, power);
    weightedSum += weight * p.value;
    weightTotal += weight;
  }

  return weightedSum / weightTotal;
}
