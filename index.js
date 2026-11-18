// =====================================================================
//  index.js — HET STARTPUNT
//  react-scripts begint altijd bij dit bestand (de naam moet index.js zijn).
//  Het zoekt <div id="root"> in public/index.html en zet daar de app in.
//  Dit bestand hoef je bijna nooit aan te passen.
// =====================================================================
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./App.css";

createRoot(document.getElementById("root")).render(
  // StrictMode geeft extra waarschuwingen tijdens het ontwikkelen.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
