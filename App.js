// =====================================================================
//  Opbouw:
//    useSerialData  -> haalt data binnen       (hooks/)
//    ConnectionBar  -> knop + status           (components/)
//    SensorDot      -> één rondje per sensor   (components/)
//    Legend         -> uitleg van de kleuren   (components/)
// =====================================================================
import { SENSORS } from "./config.js";
import { useSerialData } from "./hooks/useSerialData.js";
import ConnectionBar from "./components/ConnectionBar.js";
import SensorDot from "./components/SensorDot.js";
import Legend from "./components/Legend.js";

export default function App() {
  // Hier komt de data vandaan. Straks wissel je deze ene regel om naar
  // useWebSocketData() om via wifi te werken.
  const { values, status, error, connect } = useSerialData();

  return (
    <main>
      <h1>FSR kleurtest</h1>
      <p className="hint">
        Open in Chrome of Edge. Sluit eerst de Serial Monitor én de Serial
        Plotter in Arduino.
      </p>

      <ConnectionBar status={status} error={error} onConnect={connect} />

      <div className="sensors">
        {/* Voor elke sensor uit config.js één rondje, met de bijbehorende waarde */}
        {SENSORS.map((sensor) => (
          <SensorDot
            key={sensor.channel}
            name={sensor.name}
            value={values[sensor.channel]}
          />
        ))}
      </div>

      <Legend />
    </main>
  );
}
