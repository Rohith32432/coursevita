import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

function QR() {
  const [qrCodeURL, setQrCodeURL] = useState('');

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 100);
  };

  const generateQRCode = async () => {
    const randomString = generateRandomString();
    try {
      const str = {
        amount: 500,
        currency: 'INR',
        paymentMethod: 'UPI',
        transactionId: randomString, // Added transaction ID for better tracking
      };
      const url = await QRCode.toDataURL(JSON.stringify(str));
      setQrCodeURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQRCode(); // Generate QR Code on component load
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">QR Code Generator</h2>
      {qrCodeURL ? (
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <img src={qrCodeURL} alt="QR Code" className="w-48 h-48" />
        </div>
      ) : (
        <p className="text-gray-500">Generating QR code...</p>
      )}
      <button
        onClick={generateQRCode}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Generate New QR Code
      </button>
    </div>
  );
}

export default QR;
