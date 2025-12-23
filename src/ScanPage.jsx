import { useState } from "react";
import Scanner from "./Scanner";
import confetti from "canvas-confetti";
import "./styles.css";

export default function ScanPage() {
  const [result, setResult] = useState(null);

  const handleScan = async (qr) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qr_code: qr }),
    });

    const data = await res.json();

    if (data.status === "success")
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

    setResult(data);
  };

  return (
    <div className="container">
      <header>
        <img src="/pcm.png" alt="Logo" />
        <h2>Min-Summit Verification</h2>
      </header>

      <Scanner onScan={handleScan} />

      {result && (
        <div className={`result ${result.status}`}>
          <h3>{result.name}</h3>
          <p>Kanda: {result.zone}</p>
          <strong>{result.message}</strong>
        </div>
      )}
    </div>
  );
}
