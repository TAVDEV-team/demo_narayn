import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ NEW

  const handleSubmit = () => {
    setLoading(true); // ✅ start loading
    const payload = { username, password };

    axios.post("https://narayanpur-high-school.onrender.com/api/user/token/", payload)
      .then((res) => {
        const token = res.data.access;
        if (token) {
          localStorage.setItem("token", token);
          setMessage({ type: "success", text: "✅ Login successful!" });
          setTimeout(() => navigate('/teacher-portal'), 1200);
        } else {
          setMessage({ type: "error", text: "⚠️ Token missing in response" });
        }
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.detail || "Login failed. Please check your credentials.";
        setMessage({ type: "error", text: `❌ ${errorMsg}` });
      })
      .finally(() => {
        setLoading(false); // ✅ stop loading
      });
  };

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center">
      <div className="flex items-center justify-between w-[90%] max-w-5xl bg-white p-8 rounded-xl shadow-xl">

        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Login</h2>

          {message && (
            <div className={`mb-4 p-3 rounded-md text-sm font-medium ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading} // ✅ prevent clicks while loading
              className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-2 rounded-md shadow-md transition duration-200`}
            >
              {loading ? "⏳ Logging in..." : "Login"} {/* ✅ show loading text */}
            </button>
          </div>
        </div>

        <div className="w-1/2 flex justify-center">
          <img src="/tea.avif" alt="" className="min-h-[50vh] object-contain" />
        </div>

      </div>
    </div>
  );
}

export default Login;
