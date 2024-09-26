import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/UserContext';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchPayments = async () => {
    try {
      if (user !== undefined) {
        const response = await axios.get(`http://localhost:5000/api/payments/user/${user._id}`);
        setPayments(response.data);
      }
    } catch (err) {
      setError('Failed to fetch payments');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Payments</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Transaction ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Amount</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Currency</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Payment Method</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.transactionId} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b border-gray-200">{payment.transactionId}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{payment.amount}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{payment.currency}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{payment.paymentMethod}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{payment.status}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No payments found.</p>
      )}
    </div>
  );
};

export default Payments;
