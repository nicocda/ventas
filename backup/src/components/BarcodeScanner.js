import React, { useState, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [scannerIsRunning, setScannerIsRunning] = useState(false);

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
        },
        decoder: {
          readers: ['ean_reader'], // Puedes especificar otros tipos de códigos de barras aquí
        },
      },
      (err) => {
        if (err) {
          console.error('Error al inicializar el lector de códigos de barras:', err);
          return;
        }
        Quagga.start();
        setScannerIsRunning(true);
      }
    );

    Quagga.onDetected((result) => {
      if (result && result.codeResult && result.codeResult.code) {
        onScan(result.codeResult.code);
        stopScanner();
      }
    });
  };

  const stopScanner = () => {
    Quagga.stop();
    setScannerIsRunning(false);
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
      <button
        className="btn btn-outline-primary"
        onClick={scannerIsRunning ? stopScanner : startScanner}
      >
        {scannerIsRunning ? 'Detener Escaneo' : 'Escanear Código de Barras'}
      </button>
    </div>
  );
};

export default BarcodeScanner;
