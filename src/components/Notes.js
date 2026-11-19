import { useState } from "react";
import "./Notes.css";
import sessionNotes from "../assets/sessionNotes.json";

// Het pijltje. Draait om als de notitie open staat.
function Chevron({ open }) {
  return (
    <svg
      className={`note-chevron ${open ? "is-open" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M5 9l7 7 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Notes() {
  const notes = Object.values(sessionNotes.noteItems);
  const lastTitle = notes.length > 0 ? notes[notes.length - 1].title : null;
  const [openNotes, setOpenNotes] = useState({ [lastTitle]: true });

  // Eén notitie open- of dichtklappen.
  function toggle(title) {
    setOpenNotes((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <div className="notes">
      <h1>Notities</h1>
      {notes.map((note, index) => {
        const isOpen = !!openNotes[note.title]; // !! = maak er true/false van
        const isLast = index === notes.length - 1; // laatste in de lijst?

        return (
          <div key={note.title} className="note">
            <button
              type="button"
              className={`note-header ${isLast ? "is-last" : ""}`}
              onClick={() => toggle(note.title)}
              aria-expanded={isOpen}
            >
              {/* Titel en datum samen: "Sessie 3 ~ 23-09-2026" */}
              <h2>
                {note.title} <span>( {note.datum} )</span>
              </h2>
              <Chevron open={isOpen} />
            </button>

            {isOpen && <p className="note-content">{note.content}</p>}
          </div>
        );
      })}
    </div>
  );
}
