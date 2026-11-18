# FSR kleurtest (React)

Live kleurweergave van de druksensoren, via USB (Web Serial).

## Eenmalig installeren
1. Installeer Node.js (LTS) van https://nodejs.org
2. Open een terminal in deze map en typ:
   ```
   npm install
   ```

## Starten
```
npm run dev
```
Open daarna de link die verschijnt (meestal http://localhost:5173) in **Chrome**.
Sluit eerst de Serial Monitor/Plotter in Arduino en klik op "Verbind met ESP32".

## Waar staat wat?
| Bestand | Wat het doet |
|---|---|
| `src/config.js` | Alle instellingen: sensoren, kleuren, drempelwaarden |
| `src/hooks/useSerialData.js` | Verbinding met de ESP32 en data binnenhalen |
| `src/utils/parseLine.js` | Tekst van de ESP32 omzetten naar getallen |
| `src/utils/levels.js` | Meetwaarde omzetten naar een kleur |
| `src/components/` | De onderdelen van het scherm |
| `src/App.jsx` | Het hoofdscherm dat alles samenvoegt |
| `src/App.css` | De opmaak |
