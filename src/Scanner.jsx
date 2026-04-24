import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";
import "./styles.css";

export default function Scanner({ onScan }) {
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    const html5Qr = new Html5Qrcode("qr-reader");

    const config = { fps: 15, qrbox: { width: 264, height: 264 } };

    const onSuccess = (text) => {
      if (!activeRef.current) return;
      html5Qr
        .stop()
        .catch(() => {})
        .finally(() => onScan(text));
    };

    html5Qr
      .start({ facingMode: "environment" }, config, onSuccess, () => {})
      .catch(() => {
        // Fallback: try any available camera
        html5Qr
          .start({ facingMode: "user" }, config, onSuccess, () => {})
          .catch(console.error);
      });

    return () => {
      activeRef.current = false;
      html5Qr.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="scanner-fullscreen">
      {/* html5-qrcode mounts video here */}
      <div id="qr-reader" />

      {/* Custom overlay */}
      <div className="scanner-overlay">
        <div className="scanner-title">
          <h2>Wedding Verification</h2>
        </div>

        <div className="scan-frame">
          <div className="scan-corner tl" />
          <div className="scan-corner tr" />
          <div className="scan-corner bl" />
          <div className="scan-corner br" />
          <div className="scan-inner">
            <div className="scan-line" />
          </div>
        </div>

        <p className="scan-hint">Align QR code within the frame</p>
      </div>
    </div>
  );
}
