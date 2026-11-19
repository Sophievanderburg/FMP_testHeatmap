// =====================================================================
//  EpdList.js — TOONT ALLE GEGEVENS UIT HET EPD
//  Voor elk onderdeel: de naam als <h2>, de waarde(n) als <p>.
// =====================================================================
import "./Epd.css";
import epdData from "../assets/epd.json";

// Maakt de eerste letter een hoofdletter: "diagnose" -> "Diagnose"
function formatLabel(key) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export default function EpdList() {
  // Object.entries maakt van het object een lijst met [naam, waarde]-paren:
  // [["name", "Kira..."], ["klachten", { 0: "Somberheid", ... }], ...]
  const items = Object.entries(epdData.epdItems);

  return (
    <div className="epd">
      <h1>EPD</h1>
      {items.map(([key, value]) => (
        // 'key' is nodig voor React bij lijsten; we gebruiken de naam
        <div key={key} className="epd-item">
          <h2>{formatLabel(key)}</h2>

          {/* Is de waarde tekst? Eén <p>. Is het een groepje? Eén <p> per waarde. */}
          {typeof value === "object" ? (
            Object.values(value).map((item) => <p key={item}>{item}</p>)
          ) : (
            <p>{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
