import React, { useState } from 'react';
import { useAuth } from '../Context/UserContext';
import axios from 'axios';

function MakePayment() {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'INR', // Default to INR for better UX
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state while submitting
    try {
      const response = await axios.post('http://localhost:5000/api/payments/create', {
        userId: user._id,
        amount: formData.amount,
        currency: formData.currency,
      });
      
      if (response.status === 201) {
        console.log('Payment created successfully');
      }
      setIsLoading(false); // Hide loading state
    } catch (error) {
      console.error('Error making payment:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Make Payment</h1>
        {isLoading ? (
          <h2 className="text-center text-blue-500">Processing your payment...</h2>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label htmlFor="currency" className="block text-gray-700 text-sm font-bold mb-2">Currency:</label>
              <select
                name="currency"
                id="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                {/* Add more currencies as needed */}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Payment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MakePayment;
