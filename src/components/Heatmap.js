// =====================================================================
//  Heatmap.js — DE RECHTHOEK MET KLEUREN
//
//  Tekent op een <canvas> (een tekenvlak in de browser):
//   1. Verdeelt de rechthoek in kleine tegeltjes (HEATMAP.cellSize).
//   2. Schat voor elk tegeltje de druk uit de sensoren (interpolatie).
//   3. Kleurt het tegeltje met de kleur die bij die druk hoort.
//   4. Tekent (optioneel) de sensorposities erbovenop.
//
//  Props:
//   values -> meetwaarden per kanaal, bijv. { 0: 123, 1: 456, 2: 789 }
// =====================================================================
import "./Heatmap.css";
import { useEffect, useRef } from "react";
import { SENSORS, HEATMAP } from "../config.js";
import { idwValue } from "../utils/interpolate.js";
import { levelFor, smoothColor } from "../utils/levels.js";

// Kleur bepalen volgens de gekozen modus in config.js.
function colorFor(value) {
  if (HEATMAP.colorMode === "smooth") {
    return smoothColor(value, HEATMAP.maxValue);
  }
  return levelFor(value).color;
}

export default function Heatmap({ values }) {
  // useRef geeft ons toegang tot het echte <canvas>-element om op te tekenen.
  const canvasRef = useRef(null);

  // useEffect draait na elke keer dat 'values' verandert: dan tekenen we opnieuw.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d"); // Het "penseel" waarmee we tekenen
    const { width, height, cellSize, power } = HEATMAP;

    // 1. Zet de sensoren om naar pixelposities, en neem alleen sensoren mee
    //    waarvan we al een meetwaarde hebben.
    const points = SENSORS.filter((s) => values[s.channel] !== undefined).map(
      (s) => ({
        x: s.x * width,
        y: s.y * height,
        value: values[s.channel],
      }),
    );

    // Nog geen data? Maak de rechthoek grijs en stop.
    if (points.length === 0) {
      ctx.fillStyle = "#dddddd";
      ctx.fillRect(0, 0, width, height);
    } else {
      // 2 + 3. Loop over alle tegeltjes: van links naar rechts, van boven naar beneden.
      for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
          // We rekenen met het midden van het tegeltje.
          const value = idwValue(
            x + cellSize / 2,
            y + cellSize / 2,
            points,
            power,
          );
          ctx.fillStyle = colorFor(value);
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }

    // 4. Sensorposities tekenen: wit rondje met de naam erin.
    if (HEATMAP.showSensors) {
      for (const s of SENSORS) {
        const cx = s.x * width;
        const cy = s.y * height;
        ctx.beginPath();
        ctx.arc(cx, cy, 22, 0, Math.PI * 2); // Cirkel met straal 22 px
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.font = "600 14px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.name, cx, cy);
      }
    }
  }, [values]); // <- "teken opnieuw zodra values verandert"

  return (
    <canvas
      ref={canvasRef}
      className="heatmap"
      width={HEATMAP.width}
      height={HEATMAP.height}
    />
  );
}
