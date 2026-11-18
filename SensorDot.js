// =====================================================================
//  SensorDot.js — ÉÉN GEKLEURD RONDJE VOOR ÉÉN SENSOR
//  Props:
//    name  -> naam van de sensor, bijv. "Sensor C0"
//    value -> meetwaarde (0–4095), of undefined als er nog niets binnen is
// =====================================================================
import { levelFor } from "../utils/levels.js";

export default function SensorDot({ name, value }) {
  // Nog geen data ontvangen? Dan grijs en een streepje tonen.
  const hasValue = value !== undefined;
  const level = hasValue ? levelFor(value) : null;

  return (
    <div className="sensor">
      <div
        className="dot"
        style={{ backgroundColor: hasValue ? level.color : "#ccc" }}
      />
      <div className="name">{name}</div>
      <div className="value">
        {hasValue ? `${value} · ${level.label}` : "–"}
      </div>
    </div>
  );
}
