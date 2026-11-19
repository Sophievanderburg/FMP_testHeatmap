// =====================================================================
//  App.js — DE BASIS VAN DE APP
//
//  Regelt twee dingen:
//   1. De data (verbinding met de ESP32 + bewegingsintensiteit).
//      Die staat HIER en niet in een scherm, zodat de verbinding en de
//      grafiekgeschiedenis blijven bestaan als je van scherm wisselt.
//   2. Welk scherm er getoond wordt (Therapist of Client), via de
//      dropdown rechtsboven.
//
//  Opbouw:
//    useSerialData        -> haalt data binnen                (hooks/)
//    useMovementIntensity -> berekent intensiteit + label     (hooks/)
//    ScreenSwitcher       -> dropdown rechtsboven             (components/)
//    TherapistScreen      -> heatmap + grafiek                (screens/)
//    ClientScreen         -> scherm voor de cliënt            (screens/)
// =====================================================================
import { useState } from "react";
import { useSerialData } from "./hooks/useSerialData.js";
import { useMovementIntensity } from "./hooks/useMovementIntensity.js";
import ScreenSwitcher from "./components/ScreenSwitcher.js";
import TherapistScreen from "./screens/TherapistScreen.js";
import ClientScreen from "./screens/ClientScreen.js";

// De schermen waartussen je kunt kiezen. Een scherm erbij?
// Voeg hier een regel toe én een regel bij "Het gekozen scherm" hieronder.
const SCREENS = [
  { key: "therapist", label: "Therapist" },
  { key: "client", label: "Client" },
];

export default function App() {
  // Welk scherm staat nu open? Begint op "therapist".
  const [screen, setScreen] = useState("therapist");

  // De data. Straks wissel je useSerialData() om naar useWebSocketData()
  // om via wifi te werken.
  const serial = useSerialData();
  const intensity = useMovementIntensity(serial.values);

  return (
    <>
      {/* Dropdown rechtsboven, zichtbaar op beide schermen */}
      <ScreenSwitcher options={SCREENS} value={screen} onChange={setScreen} />

      {/* Het gekozen scherm */}
      {screen === "therapist" && (
        <TherapistScreen serial={serial} intensity={intensity} />
      )}
      {screen === "client" && <ClientScreen />}
    </>
  );
}
