// =====================================================================
//  Legend.js — DE LEGENDA (welke kleur betekent wat)
//  Wordt automatisch opgebouwd uit LEVELS in config.js.
// =====================================================================
import { LEVELS } from "../config.js";

export default function Legend() {
  return (
    <div className="legend">
      {/* .map() maakt voor elk niveau in de lijst één stukje legenda */}
      {LEVELS.map((level) => (
        // 'key' is een uniek label dat React nodig heeft bij lijsten
        <span key={level.label}>
          <span className="legend-dot" style={{ backgroundColor: level.color }} />
          {level.label}
        </span>
      ))}
    </div>
  );
}
