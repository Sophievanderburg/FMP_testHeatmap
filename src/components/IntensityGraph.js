// =====================================================================
//  IntensityGraph.js — LIJNGRAFIEK + TRENDLABEL
//  Minimalistisch, zoals het interfaceontwerp: label met pijltje erboven,
//  een lijn, assen links en onder, en tijdlabels onder de x-as.
//
//  Props:
//   history -> [{ time, value }, ...] uit useMovementIntensity
//   trend   -> labelsleutel, bijv. "stable"
//   stats   -> { slope, diff, last } voor de debug-weergave
// =====================================================================
import { INTENSITY, TREND, GRAPH } from "../config.js";

export default function IntensityGraph({ history, trend, stats }) {
  const { width, height } = GRAPH;
  const tickSpace = 24; // ruimte onder de grafiek voor de tijdlabels
  const totalHeight = height + tickSpace;
  const windowSeconds = INTENSITY.windowSeconds;
  const now = Date.now();

  // --- Y-as schaal: hoogste waarde in beeld, maar minstens GRAPH.minYMax ---
  const maxValue = Math.max(GRAPH.minYMax, ...history.map((p) => p.value));

  // Zet "seconden geleden" om naar een x-positie (rechts = nu).
  const xFor = (secondsAgo) => width - (secondsAgo / windowSeconds) * width;
  // Zet een waarde om naar een y-positie (onder = 0, boven = maxValue).
  // Kleine marge boven (4 px) zodat de lijn niet tegen de rand plakt.
  const yFor = (value) => height - (value / maxValue) * (height - 4);

  // --- De lijn: alle punten als "x,y x,y x,y ..." ---
  const points = history
    .map((p) => {
      const secondsAgo = (now - p.time) / 1000;
      return `${xFor(secondsAgo).toFixed(1)},${yFor(p.value).toFixed(1)}`;
    })
    .join(" ");

  const label = TREND.labels[trend];

  return (
    <div className="intensity">
      {/* Kop: titel + label met pijltje */}
      <div className="intensity-title">Bewegingsintensiteit</div>
      <div className="intensity-trend">
        {label.arrow && <span className="intensity-arrow">{label.arrow}</span>}
        {label.text}
      </div>

      {/* De grafiek zelf (SVG = tekening die meeschaalt met de schermbreedte) */}
      <svg className="intensity-graph" viewBox={`0 0 ${width} ${totalHeight}`}>
        {/* Assen: links (verticaal) en onder (horizontaal) */}
        <line
          x1="1"
          y1="0"
          x2="1"
          y2={height}
          stroke={GRAPH.axisColor}
          strokeWidth="2"
        />
        <line
          x1="0"
          y1={height}
          x2={width}
          y2={height}
          stroke={GRAPH.axisColor}
          strokeWidth="2"
        />

        {/* De lijn van de intensiteit */}
        {history.length > 1 && (
          <polyline
            points={points}
            fill="none"
            stroke={GRAPH.lineColor}
            strokeWidth={GRAPH.lineWidth}
            strokeLinejoin="round"
          />
        )}

        {/* Tijdlabels onder de x-as (-4:00, -2:00, Now) */}
        {GRAPH.xTicks.map(([secondsAgo, text]) => (
          <text
            key={text}
            x={xFor(secondsAgo)}
            y={height + 18}
            textAnchor={secondsAgo === 0 ? "end" : "middle"}
            className="intensity-tick"
          >
            {text}
          </text>
        ))}
      </svg>

      {/* Debug-getallen om drempels af te stellen (aan/uit in config.js) */}
      {TREND.showDebug && (
        <div className="intensity-debug">
          laatste seconde: {Math.round(stats.last)} · helling:{" "}
          {stats.slope.toFixed(1)}/s · recent − basis: {Math.round(stats.diff)}
        </div>
      )}
    </div>
  );
}
