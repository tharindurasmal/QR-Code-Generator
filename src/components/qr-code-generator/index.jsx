import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import "./style.css";

export default function QRCodeGenerator() {
  const [inputValue, setInputValue] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);

  function downloadQR() {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };

    img.src = url;
  }

  return (
    <div className="container">
      <h1 className="title">QR Code Generator</h1>

      <input
        className="input"
        type="text"
        placeholder="Enter text"
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button
        className="button"
        disabled={!inputValue}
        onClick={() => setQrValue(inputValue)}
      >
        Generate QR Code
      </button>

      <div className="qr-box" ref={qrRef}>
        <QRCode value={qrValue || "https://www.example.com"} />
      </div>

      <button
        className="button"
        disabled={!qrValue}
        onClick={downloadQR}
        style={{ marginTop: "10px" }}
      >
        Download QR Code
      </button>
    </div>
  );
}