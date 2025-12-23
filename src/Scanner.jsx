import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import "./styles.css"


export default function Scanner({ onScan }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );
    scanner.render(
      (text) => {
        scanner.clear();
        onScan(text);
      },
      () => {}
    );

    return () => scanner.clear();
  }, []);

  return <div id="reader" className="card" />;
}
