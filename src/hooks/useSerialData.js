// =====================================================================
//  useSerialData.js — DE DATABRON (verbinding met de ESP32 via USB)
//
//  Dit is een "custom hook": een herbruikbaar stukje React-logica.
//  Het regelt de verbinding en geeft terug:
//    values  -> de laatste meetwaarde per kanaal, bijv. { 0: 123, 1: 456 }
//    status  -> "disconnected" | "connecting" | "connected" | "error"
//    error   -> foutmelding (tekst) of null
//    connect -> functie om de verbinding te starten (voor de knop)
//
//  WAAROM APART? De rest van de app weet niet HOE de data binnenkomt.
//  Straks maken we een useWebSocketData.js (wifi) die precies hetzelfde
//  teruggeeft. Dan wissel je in App.js één regel om, en werkt alles door.
// =====================================================================
import { useState, useCallback } from "react";
import { BAUD_RATE } from "../config.js";
import { parseLine } from "../utils/parseLine.js";

export function useSerialData() {
  // useState = een waarde die React onthoudt. Verandert hij, dan tekent
  // React de pagina opnieuw met de nieuwe waarde.
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("disconnected");
  const [error, setError] = useState(null);

  // useCallback zorgt dat deze functie niet bij elke tekenbeurt opnieuw
  // gemaakt wordt. Niet strikt nodig, maar netjes.
  const connect = useCallback(async () => {
    // Web Serial werkt alleen in Chrome en Edge (niet in Safari/Firefox).
    if (!("serial" in navigator)) {
      setStatus("error");
      setError("Deze browser ondersteunt geen Web Serial. Gebruik Chrome of Edge.");
      return;
    }

    try {
      setStatus("connecting");

      // Laat de gebruiker de poort van de ESP32 kiezen (bijv. usbmodem...).
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: BAUD_RATE });
      setStatus("connected");
      setError(null);

      // De ESP32 stuurt losse bytes; dit zet ze om naar tekst.
      const decoder = new TextDecoderStream();
      port.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();

      // Tekst komt in stukjes binnen, niet per hele regel. Daarom bewaren we
      // alles in 'buffer' en verwerken we alleen regels die compleet zijn.
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        const lines = buffer.split("\n");
        buffer = lines.pop(); // Laatste stuk is misschien nog niet af.

        for (const line of lines) {
          const parsed = parseLine(line.trim());
          if (Object.keys(parsed).length > 0) {
            // Nieuwe waarden samenvoegen met de oude (...prev = "alles van eerst").
            setValues((prev) => ({ ...prev, ...parsed }));
          }
        }
      }
      setStatus("disconnected");
    } catch (err) {
      // Meest voorkomende oorzaken: Serial Monitor staat nog open,
      // of je hebt in het keuzevenster op "Annuleren" geklikt.
      setStatus("error");
      setError(err.message + " (staat de Serial Monitor nog open?)");
    }
  }, []);

  return { values, status, error, connect };
}
