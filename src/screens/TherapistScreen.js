// =====================================================================
//  TherapistScreen.js — HET SCHERM VOOR DE THERAPEUT
//  Voor nu alleen het woord "Therapist" in het midden.
//  Hier kun je later zelf onderdelen aan toevoegen.
// =====================================================================
import "./TherapistScreen.css";
import sessionNotes from "../assets/sessionNotes.json";

export default function TherapistScreen() {
  const notes = Object.values(sessionNotes.noteItems);

  return (
    <main className="therapist-screen">
      <div className="videocall">
        <div className="video"></div>
        <div className="caller"></div>
        <div className="data"></div>
      </div>
      <div className="epd">
        <h1>EPD</h1>
      </div>
      <div className="notes">
        <h1>Notes</h1>
        {notes.map((note) => (
          <div key={note.title} className="note">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
