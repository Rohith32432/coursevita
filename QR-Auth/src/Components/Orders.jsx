import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payments = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
console.log(user);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/user/${user._id}`);
        setPayments(response.data);
      } catch (err) {
        setError('Failed to fetch payments');
        console.error(err);
      }
    };

    fetchPayments();
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Payments</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {payments.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Transaction ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Currency</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Payment Method</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.transactionId}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.transactionId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.amount}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.currency}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.paymentMethod}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{payment.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
};

export default Payments;
