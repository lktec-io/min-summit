import { useState } from "react";
import "../styles.css";

export default function CreateGuest() {
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [qrData, setQrData] = useState(null);

  const handleCreateGuest = async () => {
    if (!name || !zone) return alert("Jaza jina na kanda");

    const res = await fetch("https://min-summit.nardio.online/create-guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, zone }),
    });

    const data = await res.json();
    setQrData(data);
  };
  const handleDownloadQR = () => {
    if (!qrData?.qrImage) return;
    
    // Create a temporary link
    const link = document.createElement("a");
    link.href = qrData.qrImage;
    link.download = `${qrData.name}_${qrData.zone}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <header>
        <h2>Create Guest QR</h2>
      </header>

      <div className="card">
        <input
          type="text"
          placeholder="Guest Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Zone"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        />
        <button className="batan" onClick={handleCreateGuest}>
          Generate QR
        </button>
      </div>

      {qrData && (
        <div className="result success">
          <h3>{qrData.name} - {qrData.zone}</h3>
          <img src={qrData.qrImage} alt="QR Code" style={{ marginTop: '10px' }} />
          <p>QR ready to print on badge</p>
          <button className="batan" onClick={handleDownloadQR}>
            Download QR
          </button>
        </div>
      )}
    </div>
  );
}
