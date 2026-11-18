// =====================================================================
//  Opbouw:
//    useSerialData  -> haalt data binnen       (hooks/)
//    ConnectionBar  -> knop + status           (components/)
//    Heatmap        -> rechthoek met kleuren   (components/)
//    Legend         -> uitleg van de kleuren   (components/)
// =====================================================================
import { useSerialData } from "./hooks/useSerialData.js";
import ConnectionBar from "./components/ConnectionBar.js";
import Heatmap from "./components/Heatmap.js";
import Legend from "./components/Legend.js";

export default function App() {
  // Hier komt de data vandaan. Straks wissel je deze ene regel om naar
  // useWebSocketData() om via wifi te werken.
  const { values, status, error, connect } = useSerialData();

  return (
    <main>
      <h1>FSR heatmap</h1>
      <p className="hint">
        Open in Chrome of Edge. Sluit eerst de Serial Monitor én de Serial
        Plotter in Arduino.
      </p>

      <ConnectionBar status={status} error={error} onConnect={connect} />

      {/* De heatmap krijgt alle meetwaarden en regelt zelf de rest */}
      <div className="heatmap-wrapper">
        <Heatmap values={values} />
      </div>

      <Legend />
    </main>
  );
}
