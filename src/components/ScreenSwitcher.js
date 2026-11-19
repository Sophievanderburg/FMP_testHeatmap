// =====================================================================
//  ScreenSwitcher.js — DE DROPDOWN RECHTSBOVEN (Therapist / Client)
//
//  Een zelfgemaakte dropdown, zodat hij er precies uitziet zoals het
//  ontwerp. (Een standaard <select> kun je bijna niet vormgeven.)
//
//  Props:
//   options  -> lijst met keuzes: [{ key: "therapist", label: "Therapist" }, ...]
//   value    -> de key van het scherm dat nu open is
//   onChange -> functie die wordt aangeroepen met de nieuwe key
// =====================================================================
import { useEffect, useRef, useState } from "react";
import "./ScreenSwitcher.css";

// Het pijltje (chevron) als kleine tekening.
function Chevron() {
  return (
    <svg className="switcher-chevron" viewBox="0 0 24 24" aria-hidden="true">
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

export default function ScreenSwitcher({ options, value, onChange }) {
  // Staat het menu open of dicht?
  const [open, setOpen] = useState(false);

  // Verwijzing naar de hele dropdown, om te weten of er "buiten" geklikt wordt.
  const containerRef = useRef(null);

  // Menu sluiten als je ernaast klikt of op Escape drukt.
  useEffect(() => {
    if (!open) return; // Alleen nodig als het menu open staat.

    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    function handleKey(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    // Opruimen als het menu weer dicht gaat.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // Het label van het scherm dat nu gekozen is (bijv. "Therapist").
  const current = options.find((option) => option.key === value);

  return (
    <div ref={containerRef} className={`switcher ${open ? "is-open" : ""}`}>
      {/* De "pil" bovenaan: klik = menu open/dicht */}
      <button
        type="button"
        className="switcher-header"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current.label}</span>
        <Chevron />
      </button>

      {/* Het menu met keuzes, alleen zichtbaar als 'open' waar is */}
      {open && (
        <ul className="switcher-menu" role="listbox">
          {options.map((option) => {
            const isSelected = option.key === value;
            return (
              <li key={option.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`switcher-option ${isSelected ? "is-selected" : ""}`}
                  onClick={() => {
                    onChange(option.key); // Ander scherm kiezen
                    setOpen(false); // Menu weer dicht
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
