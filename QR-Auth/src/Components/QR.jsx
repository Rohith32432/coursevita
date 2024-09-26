import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

function QR() {

  const url='http://localhost:5000/api/payment/'

  const [qrCodeURL, setQrCodeURL] = useState('');
 
  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 100);
  };
 
  const generateQRCode = async () => {
    const randomString = generateRandomString();
    try {
      const str={
        amount:500,
        currency:'inr',
        paymentMethod:'upi'
      }
      const url = await QRCode.toDataURL(JSON.stringify(str));
      setQrCodeURL(url);
    } catch (err) {
      console.error(err);
    }
  };
 
  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Random QR Code Generator</h2>
      {qrCodeURL && (
        <div style={{ marginTop: '20px' }}>
          <img src={qrCodeURL} alt="QR Code" height={200}/>
        </div>
      )}
      <button onClick={generateQRCode} style={{ marginTop: '20px', padding: '10px' }}>
        Generate New QR Code
      </button>
    </div>
  );
}

export default QR;
