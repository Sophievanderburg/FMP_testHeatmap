// =====================================================================
//  EpdList.js — TOONT ALLE GEGEVENS UIT HET EPD
//  Voor elk onderdeel: de naam als <h2>, de waarde(n) als <p>.
// =====================================================================
import sessionNotes from "../assets/sessionNotes.json";

export default function Notes() {
  const notes = Object.values(sessionNotes.noteItems);

  return (
    <div className="notes">
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.title} className="note">
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}
