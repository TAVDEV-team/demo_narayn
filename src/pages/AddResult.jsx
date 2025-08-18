import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddResult() {
  const { id } = useParams(); // student ID
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    exam: 0,
    mcq: 2147483647, // default max as per your backend
    practical: 2147483647,
    written: 2147483647,
  });

  const [message, setMessage] = useState(""); // inline message
  const [error, setError] = useState(false); // success or error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    try {
      // include authentication token if required
      const token = localStorage.getItem("token"); 
      await axios.post(
  "https://narayanpur-high-school.onrender.com/api/result/",
  {
    student: id,
    subject: formData.subject,
    exam: parseInt(formData.exam),
    mcq: parseInt(formData.mcq),
    practical: formData.practical ? parseInt(formData.practical) : undefined, // only send if provided
    written: parseInt(formData.written),
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      setMessage("Result added successfully ✅");
      setError(false);
      // Optionally reset the form
      setFormData({
        subject: "",
        exam: 0,
        mcq: 0,
        practical: "",
        written: 0,
      });
    } catch (err) {
      console.error("Error adding result:", err);
      setMessage("Failed to add result ❌");
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-sky-700">
          Add Result
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter Subject Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Exam */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Exam Marks
            </label>
            <input
              type="number"
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              placeholder="Enter Exam Marks"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* MCQ */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              MCQ Marks
            </label>
            <input
              type="number"
              name="mcq"
              value={formData.mcq}
              onChange={handleChange}
              placeholder="Enter MCQ Marks"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Practical */}
          <div>
  <label className="block font-semibold mb-1 text-gray-700">
    Practical Marks (optional)
  </label>
  <input
    type="number"
    name="practical"
    value={formData.practical}
    onChange={handleChange}
    placeholder="Enter Practical Marks if any"
    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
  />
</div>


          {/* Written */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Written Marks
            </label>
            <input
              type="number"
              name="written"
              value={formData.written}
              onChange={handleChange}
              placeholder="Enter Written Marks"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Inline Message */}
          {message && (
            <p className={`text-center font-semibold ${error ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700"
            >
              Save Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
