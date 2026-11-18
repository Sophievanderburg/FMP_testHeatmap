// =====================================================================
//  ConnectionBar.js — DE VERBIND-KNOP + STATUS
//  Krijgt alles wat het nodig heeft binnen als "props" (invoer van buitenaf).
//  Het component weet zelf niets van de ESP32; het toont alleen.
// =====================================================================

// Leesbare Nederlandse tekst per status.
const STATUS_TEXT = {
  disconnected: "Niet verbonden",
  connecting: "Verbinden…",
  connected: "Verbonden",
  error: "Fout",
};

export default function ConnectionBar({ status, error, onConnect }) {
  return (
    <div className="connection-bar">
      {/* Knop is uitgeschakeld zolang we al verbonden of bezig zijn */}
      <button
        onClick={onConnect}
        disabled={status === "connected" || status === "connecting"}
      >
        Verbind met ESP32
      </button>
      <p className="status">
        {STATUS_TEXT[status]}
        {error && `: ${error}`}
      </p>
    </div>
  );
}
