import axios from 'axios';
import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const App = () => {
  const [data, setData] = useState('No result');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const {user} =useAuth()
  const handleResult = (data) => {
    if (data) {
      setData(data);

      try {
        const parsedData = JSON.parse(data); 
        sendData(parsedData);  
      } catch (err) {
        setErrorMessage('Invalid QR data format');
        console.error('Error parsing QR code data:', err);
      }
    }
  };
  
  const handleError = (err) => {
    console.error(err);
  };

  async function sendData(dataToSend) {
    try {
      // const response = await axios.post('http://localhost:5000/api/payments', {
      //   userId: user._id,
      //   amount: dataToSend.amount,
      //   paymentMethod: dataToSend.paymentMethod,
      // });
      
      const response = await axios.get('http://localhost:5000/api/payments')
      console.log('API Response:', response);
 
      if (response.status === 200) {
        navigate('/payment');
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
      delay={300}
      facingMode={"environment"}
      onError={handleError}
      onScan={handleResult}
      style={{ width: '100%' }}
    />
    }

      <p>Scanned Data: {data}</p>

      {/* Display error messages, if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default App;