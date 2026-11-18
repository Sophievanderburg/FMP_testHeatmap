// =====================================================================
//  Opbouw:
//    useSerialData        -> haalt data binnen                (hooks/)
//    useMovementIntensity -> berekent intensiteit + label     (hooks/)
//    ConnectionBar        -> knop + status                    (components/)
//    Heatmap              -> rechthoek met kleuren            (components/)
//    Legend               -> uitleg van de kleuren            (components/)
//    IntensityGraph       -> grafiek laatste 5 min + label    (components/)
// =====================================================================
import { useSerialData } from "./hooks/useSerialData.js";
import { useMovementIntensity } from "./hooks/useMovementIntensity.js";
import ConnectionBar from "./components/ConnectionBar.js";
import Heatmap from "./components/Heatmap.js";
import Legend from "./components/Legend.js";
import IntensityGraph from "./components/IntensityGraph.js";

export default function App() {
  // Hier komt de data vandaan. Straks wissel je deze ene regel om naar
  // useWebSocketData() om via wifi te werken.
  const { values, status, error, connect } = useSerialData();

  // Uit dezelfde meetwaarden berekenen we de bewegingsintensiteit.
  const { history, trend, stats } = useMovementIntensity(values);

  return (
    <main>
      <h1>FSR heatmap</h1>
      <p className="hint">
        Open in Chrome of Edge. Sluit eerst de Serial Monitor én de Serial
        Plotter in Arduino.
      </p>

      <ConnectionBar status={status} error={error} onConnect={connect} />

      <div className="heatmap-wrapper">
        <Heatmap values={values} />
        <Legend />
        <IntensityGraph history={history} trend={trend} stats={stats} />
      </div>
    </main>
  );
}
