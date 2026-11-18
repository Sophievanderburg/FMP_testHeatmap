export const BAUD_RATE = 115200;

export const SENSORS = [
  { channel: 0, name: "C0", x: 0.19, y: 0.5 },
  { channel: 1, name: "C1", x: 0.5, y: 0.5 },
  { channel: 2, name: "C2", x: 0.81, y: 0.5 },
];

export const LEVELS = [
  {
    max: 200,
    color: "#3B82F6", // blauw
    label: "Geen druk",
  },
  {
    max: 500,
    color: "#22C55E", // groen
    label: "Weinig druk",
  },
  {
    max: 600,
    color: "#EAB308", // geel
    label: "Meer druk",
  },
  {
    max: Infinity,
    color: "#EF4444", // rood
    label: "Veel druk",
  },
];

// Instellingen voor de heatmap.
export const HEATMAP = {
  // Afmetingen van de rechthoek in pixels (liggend: breder dan hoog).
  width: 800,
  height: 320,

  // Grootte van één "tegeltje" in pixels. De heatmap wordt opgebouwd uit
  // kleine vierkantjes. Kleiner = gladder, maar meer rekenwerk.
  cellSize: 4,

  // Hoe sterk een dichtbije sensor meetelt t.o.v. een verre sensor.
  // 2 is gebruikelijk. Hoger = elke sensor heeft een eigen, scherper "eiland";
  // lager = alles vloeit meer in elkaar over.
  power: 2,

  // "levels" -> elke plek krijgt één van de 4 kleuren uit LEVELS (vlakken)
  // "smooth" -> vloeiend kleurverloop van blauw naar rood
  colorMode: "levels",

  // Hoogste meetwaarde van de ADC (12 bits = 0–4095). Alleen nodig voor "smooth".
  maxValue: 4095,

  // Sensorposities tonen als rondje met naam (handig tijdens testen).
  showSensors: true,
};
