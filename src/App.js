import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Replace this with your actual Render backend URL once deployed
  const BACKEND_URL = 'https://backend-s7a3.onrender.com/';

  const fetchFromBackend = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${BACKEND_URL}/`);
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        setError('Failed to fetch from backend');
      }
    } catch (err) {
      setError('Error connecting to backend: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          React + Spring Boot
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={fetchFromBackend}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Loading...' : 'Test Backend Connection'}
          </button>

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Backend Response:</h3>
              <p className="text-green-700">{message}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Instructions:</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Deploy your Spring Boot app to Render</li>
              <li>2. Update BACKEND_URL with your Render URL</li>
              <li>3. Add CORS configuration to your backend</li>
              <li>4. Test the connection!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;