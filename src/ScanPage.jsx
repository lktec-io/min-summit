import { useState } from "react";
import Scanner from "./Scanner";
import confetti from "canvas-confetti";
import "./styles.css";

const successSound = new Audio("/success.mp3");

export default function ScanPage() {
  const [result, setResult] = useState(null);

  const handleScan = async (qr) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qr_code: qr }),
    });
    const data = await res.json();

    if (data.status === "success") {
      confetti({ particleCount: 130, spread: 72, origin: { y: 0.6 } });
      successSound.currentTime = 0;
      successSound.play().catch(() => {});
    }

    setResult(data);
  };

  if (result) {
    const ok = result.status === "success";
    return (
      <div className={`result-overlay ${ok ? "success-bg" : "blocked-bg"}`}>
        <div className={`result-card ${result.status}`}>
          <div className={`result-icon ${ok ? "success-icon" : "blocked-icon"}`}>
            {ok ? "✓" : "✕"}
          </div>
          <h3>{result.name}</h3>
          {result.zone && <p className="zone-text">Zone: {result.zone}</p>}
          <span className={`status-badge ${result.status}`}>
            {result.message}
          </span>
          <button className="back-btn" onClick={() => setResult(null)}>
            Scan Another
          </button>
        </div>
      </div>
    );
  }

  return <Scanner onScan={handleScan} />;
}
