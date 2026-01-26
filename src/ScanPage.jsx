import { useState } from "react";
import Scanner from "./Scanner";
import confetti from "canvas-confetti";
import "./styles.css";

export default function ScanPage() {
  const [result, setResult] = useState(null);

  // 🔊 Sound
  const successSound = new Audio("/success.mp3");
  const blockedSound = new Audio("/blocked.mp3");

  const handleScan = async (qr) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qr_code: qr }),
    });

    const data = await res.json();

    if (data.status === "success") {
    


      
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });

      // 🔊 Success sound
      successSound.play();
    } else {
      // 🔊 Blocked sound
      blockedSound.play();
    }

    setResult(data);
  };

  const handleBack = () => {
    setResult(null);
  };

  return (
    <div className="container">
      <header>
        <img src="/picha.png" alt="Logo" />
        <h2>CardHub Verification</h2>
      </header>

      {!result && <Scanner onScan={handleScan} />}

      {result && (
        <div className={`result ${result.status}`}>
          <h3>{result.name}</h3>
          <p>Status: {result.zone}</p>
          <strong>{result.message}</strong>

          <button className="batan back-btn" onClick={handleBack}>
            ⬅ Back to Scan
          </button>
        </div>
      )}
    </div>
  );
}
