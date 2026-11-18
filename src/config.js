export const BAUD_RATE = 115200;

export const SENSORS = [
  { channel: 0, name: "C0", x: 0.19, y: 0.5 },
  { channel: 1, name: "C1", x: 0.5, y: 0.5 },
  { channel: 2, name: "C2", x: 0.81, y: 0.5 },
];

export const LEVELS = [
  { max: 20, color: "#3B82F6", label: "Geen druk" }, // blauw
  { max: 200, color: "#22C55E", label: "Weinig druk" }, // groen
  { max: 300, color: "#EAB308", label: "Meer druk" }, // geel
  { max: Infinity, color: "#EF4444", label: "Veel druk" }, // rood
];

// Instellingen voor de heatmap.
export const HEATMAP = {
  width: 800, // breedte in pixels
  height: 320, // hoogte in pixels
  cellSize: 4, // grootte van één tegeltje (kleiner = gladder)
  power: 2, // hoe sterk een dichtbije sensor meetelt
  colorMode: "levels", // "levels" (4 kleuren) of "smooth" (vloeiend)
  maxValue: 4095, // hoogste ADC-waarde (alleen voor "smooth")
  showSensors: true, // sensorposities tonen
};

// =====================================================================
//  BEWEGINGSINTENSITEIT
// =====================================================================
//  Hoe het werkt: bij elke meting kijken we hoeveel ELKE sensor veranderd
//  is t.o.v. de vorige meting, en tellen dat op. Al die veranderingen
//  binnen één seconde samen = de bewegingsintensiteit van die seconde.
//  Stilzitten -> bijna 0. Veel verschuiven -> hoog getal.
export const INTENSITY = {
  // Hoe ver de grafiek terugkijkt, in seconden (300 = 5 minuten).
  windowSeconds: 300,

  // Om de hoeveel seconden er een punt in de grafiek bijkomt.
  bucketSeconds: 1,

  // Veranderingen kleiner dan dit (per sensor, per meting) tellen niet mee.
  // Dit filtert de ruis van de ADC weg, zodat stilzitten ook echt ~0 geeft.
  // Ziet de grafiek bij stilzitten nog "kriebelig" uit? Verhoog dit getal.
  noiseThreshold: 30,
};

// =====================================================================
//  TRENDLABEL (Toenemend / Afnemend / Stabiel / Piekend / Abrupte dip)
// =====================================================================
//  Zet showDebug op true: dan zie je onder de grafiek de getallen
//  waarmee het label berekend wordt. Daarmee kun je de drempels afstellen.
export const TREND = {
  // Pas een label tonen als er minstens zoveel seconden data is.
  minDataSeconds: 10,

  // --- Toenemend / Afnemend / Stabiel ---
  // We trekken een rechte lijn door de laatste X seconden en kijken naar
  // de helling (hoeveel de intensiteit per seconde stijgt of daalt).
  trendWindowSeconds: 60,
  // Helling groter dan dit -> "Toenemend"; kleiner dan min dit -> "Afnemend";
  // daartussen -> "Stabiel".
  slopeThreshold: 5,

  // --- Piekend / Abrupte dip ---
  // We vergelijken het gemiddelde van de laatste paar seconden ("recent")
  // met het gemiddelde van de periode daarvoor ("basis").
  spike: {
    recentSeconds: 5, // lengte van "recent"
    baselineSeconds: 30, // lengte van "basis" (direct daarvoor)
    minIncrease: 1500, // recent minstens zoveel HOGER -> "Piekend"
    minDecrease: 1500, // recent minstens zoveel LAGER -> "Abrupte dip"
  },

  // --- Rust in het label (tegen knipperen) ---
  // Een label blijft minimaal zoveel seconden staan voordat het mag wisselen.
  minLabelSeconds: 5,
  // Piekend en Abrupte dip blijven langer staan, zodat de therapeut ze ziet.
  spikeHoldSeconds: 10,

  // Tekst en pijltje per label. Pas hier de woorden aan als je wilt.
  labels: {
    measuring: { text: "Meten…", arrow: "" },
    increasing: { text: "Toenemend", arrow: "↗" },
    decreasing: { text: "Afnemend", arrow: "↘" },
    stable: { text: "Stabiel", arrow: "→" },
    spike: { text: "Piekend", arrow: "↑" },
    dip: { text: "Abrupte dip", arrow: "↓" },
  },

  // Getallen achter het label tonen (handig tijdens testen).
  showDebug: true,
};

// =====================================================================
//  GRAFIEK (uiterlijk)
// =====================================================================
export const GRAPH = {
  width: 800, // breedte in pixels (zelfde als de heatmap)
  height: 120, // hoogte van het lijngebied in pixels
  lineColor: "#222222", // kleur van de lijn
  lineWidth: 2, // dikte van de lijn
  axisColor: "#999999", // kleur van de assen

  // Labels onder de x-as: [seconden geleden, tekst]
  xTicks: [
    [240, "-4:00"],
    [120, "-2:00"],
    [0, "Now"],
  ],

  // De y-as schaalt automatisch mee met de hoogste waarde in beeld.
  // Maar nooit lager dan dit, zodat ruis bij stilzitten niet groot oogt.
  minYMax: 1000,
};
