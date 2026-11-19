// =====================================================================
//  TherapistScreen.js — HET SCHERM VOOR DE THERAPEUT
//  Voor nu alleen het woord "Therapist" in het midden.
//  Hier kun je later zelf onderdelen aan toevoegen.
// =====================================================================
import "./TherapistScreen.css";
import EpdList from "../components/Epd.js";
import Notes from "../components/Notes.js";
import VideoCall from "../components/VideoCall.js";

export default function TherapistScreen() {
  return (
    <main className="therapist-screen">
      <VideoCall />
      <EpdList />
      <Notes />
    </main>
  );
}
