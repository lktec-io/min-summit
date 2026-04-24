import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "../styles.css";

export default function CreateGuest() {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const qrRef = useRef(null);

  const handleCreateGuest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setQrData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!qrRef.current) return;
    const canvas = await html2canvas(qrRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `${qrData.name || "guest"}_${qrData.zone || "qr"}_QR.png`;
    link.click();
  };

  return (
    <div className="generate-page">
      <div className="generate-header">
        <h1>Wedding QR Generator</h1>
        <p>Generate a unique QR code for your guest</p>
      </div>

      {!qrData ? (
        <div className="generate-card">
          <button
            className="generate-btn"
            onClick={handleCreateGuest}
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : "Generate QR"}
          </button>
        </div>
      ) : (
        <div className="qr-result-wrapper">
          {/* This div is captured by html2canvas */}
          <div className="qr-card" ref={qrRef}>
            <div className="qr-frame-container">
              <div className="qr-corner tl" />
              <div className="qr-corner tr" />
              <div className="qr-corner bl" />
              <div className="qr-corner br" />
              <img src={qrData.qrImage} alt="QR Code" />
            </div>
            <div className="qr-guest-info">
              {qrData.name && <h3>{qrData.name}</h3>}
              {qrData.zone && (
                <span className="zone-badge">{qrData.zone}</span>
              )}
            </div>
          </div>

          <div className="qr-actions">
            <button className="download-btn" onClick={handleDownload}>
              Download QR
            </button>
            <button className="again-btn" onClick={() => setQrData(null)}>
              Generate Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
