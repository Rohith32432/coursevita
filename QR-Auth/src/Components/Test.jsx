import axios from 'axios';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const App = () => {
  const [data, setData] = useState('No result');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const {user} =useAuth()
  const handleResult = (result = null, error = null) => {
    if (result) {
      const scannedData = result?.text;
 
      setData(scannedData);

      
      try {
        const parsedData = JSON.parse(scannedData); 
        sendData(parsedData);  
      } catch (err) {
        setErrorMessage('Invalid QR data format');
        console.error('Error parsing QR code data:', err);
      }
    }

    if (error) {
      console.info('QR Reader Error:', error);
    }
  };

  async function sendData(dataToSend) {
    try {
      const response = await axios.post('http://localhost:5000/api/payments', {
        userId: user._id,
        amount: dataToSend.amount,
        paymentMethod: dataToSend.paymentMethod,
      });
      
      console.log('API Response:', response);
 
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      console.error('Error sending data to API:', err);
      setErrorMessage('Failed to send data to the server');
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Scanner</h1>
      
    {  user &&
      <QrReader
        onResult={handleResult}
        style={{ width: '100%' }}
      />}

      <p>Scanned Data: {data}</p>

      {/* Display error messages, if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default App;
