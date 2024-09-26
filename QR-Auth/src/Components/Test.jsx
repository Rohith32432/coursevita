import axios from 'axios';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

const App = ({ user }) => {
  const [data, setData] = useState('No result');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleResult = (result = null, error = null) => {
    if (result) {
      const scannedData = result?.text;

      // Set the scanned data for display
      setData(scannedData);

      // Attempt to parse the scanned data and send it to the API
      try {
        const parsedData = JSON.parse(scannedData); // Try to parse the JSON data
        sendData(parsedData); // Pass the parsed data to the API function
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

      // Navigate to a different page if the response is successful
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
      
    {  false &&
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
