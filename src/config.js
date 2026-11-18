export const BAUD_RATE = 115200;

// Welke sensoren je wilt zien. 'channel' = het kanaal op de multiplexer
export const SENSORS = [
  { channel: 0, name: "Sensor C0" },
  { channel: 1, name: "Sensor C1" },
  { channel: 2, name: "Sensor C2" },
];

export const LEVELS = [
  {
    max: 50,
    color: "#3B82F6", // blauw
    label: "Geen druk",
  },
  {
    max: 200,
    color: "#22C55E", // groen
    label: "Weinig druk",
  },
  {
    max: 500,
    color: "#EAB308", // geel
    label: "Meer druk",
  },
  {
    max: Infinity,
    color: "#EF4444", // rood
    label: "Veel druk",
  },
];
