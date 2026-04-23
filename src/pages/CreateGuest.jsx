import { useState, useRef } from "react";
import "../styles.css";

export default function CreateGuest() {
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const qrRef = useRef(null);
  const [qrData, setQrData] = useState(null);

  const handleCreateGuest = async () => {
    if (!name || !zone) return alert("Jaza jina na kanda");

    const res = await fetch("/api/create-guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, zone }),
    });

    const data = await res.json();
    setQrData(data);
  };
  const handleDownloadQR = async () => {
  if (!qrRef.current) return;

  const canvas = await html2canvas(qrRef.current);
  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;
  link.download = `${qrData.name}_${qrData.zone}_QR.png`;
  link.click();
};

  return (
    <div className="container">
      <header>
        <h2>Add wedding ceremony QR</h2>
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
          placeholder="Guest ID"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        />
        <button className="batan" onClick={handleCreateGuest}>
          Generate QR
        </button>
      </div>

      {qrData && (
        <div className="result success">
          <h3>
            {qrData.name} - {qrData.zone}
          </h3>
         <div className="qr-container" ref={qrRef}>
  <img src={qrData.qrImage} alt="QR Code" />

  <div className="corner tl"></div>
  <div className="corner tr"></div>
  <div className="corner bl"></div>
  <div className="corner br"></div>
</div>
          <p>QR ready to print on badge</p>
          <button className="batan" onClick={handleDownloadQR}>
            Download QR
          </button>
        </div>
      )}
    </div>
  );
}
