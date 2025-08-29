import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://narayanpur-high-school.onrender.com/api/user/token/",
        { username, password }
      );

      // Save tokens
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      // Fetch all teachers
      const teachersRes = await axios.get(
        "https://narayanpur-high-school.onrender.com/api/user/teachers/",
        { headers: { Authorization: `Bearer ${res.data.access}` } }
      );

      // Find the logged-in teacher
      const teacher = teachersRes.data.find(
        t => t.account.user.username === username
      );

      if (!teacher) throw new Error("Teacher profile not found");

      localStorage.setItem("teacherId", teacher.id);

      setMessage({ type: "success", text: "✅ Login successful!" });
      setTimeout(() => navigate('/profile'), 800);

    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || "Login failed";
      setMessage({ type: "error", text: `❌ ${errorMsg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Login</h2>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "⏳ Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
