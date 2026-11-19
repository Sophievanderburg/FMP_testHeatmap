// =====================================================================
//  TherapistScreen.js — HET SCHERM VOOR DE THERAPEUT
//  (Dit was eerst App.js.)
//
//  Dit scherm haalt zelf GEEN data op; die krijgt het binnen via props
//  vanuit App.js. Zo blijft de verbinding met de ESP32 (en de grafiek
//  van de laatste 5 minuten) bestaan als je even naar "Client" wisselt.
//
//  Props:
//   serial    -> { values, status, error, connect } uit useSerialData
//   intensity -> { history, trend, stats } uit useMovementIntensity
// =====================================================================
import "./TherapistScreen.css";
import ConnectionBar from "../components/ConnectionBar.js";
import Heatmap from "../components/Heatmap.js";
import Legend from "../components/Legend.js";
import IntensityGraph from "../components/IntensityGraph.js";

export default function TherapistScreen({ serial, intensity }) {
  const { values, status, error, connect } = serial;
  const { history, trend, stats } = intensity;

  return (
    <main>
      <ConnectionBar status={status} error={error} onConnect={connect} />

      <div className="heatmap-wrapper">
        <Heatmap values={values} />
        <Legend />
        <IntensityGraph history={history} trend={trend} stats={stats} />
      </div>
    </main>
  );
}
