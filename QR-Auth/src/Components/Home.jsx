import React from 'react';
import QR from './QR';
import QrScanner from './Test';
import Orders from './Orders';
import { useAuth } from '../Context/UserContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Home</h1>

        {user ? (
          <div className="space-y-4">
            <h2 className="text-xl text-gray-800 font-semibold">Hi, {user?.username} 👋</h2>
            <h2 className="text-lg text-gray-600">{user?.email}</h2>

            {/* QR Scanner Component */}
            <div className="mt-6">
              <QrScanner />
            </div>
          </div>
        ) : (
          <h2 className="text-xl text-red-500 font-semibold">Please login to continue.</h2>
        )}
      </div>
    </div>
  );
}

export default Home;
