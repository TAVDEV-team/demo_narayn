import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddResult() {
  const { id, group } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    examType: "",
    subject: "",
    mcq: "",
    practical: "",
    written: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // Fetch subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(
          "https://narayanpur-high-school.onrender.com/api/nphs/Subject/"
        );
        const normalized = res.data.map((s) => ({
          id: s.id,
          name: s.name,
        }));
        setSubjects(normalized);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setSubjects([]);
      }
    };
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://narayanpur-high-school.onrender.com/api/result/",
        {
          student: id,
          subject: formData.subject,
          exam_type: formData.examType,
          mcq: formData.mcq ? parseInt(formData.mcq) : null,
          practical: formData.practical ? parseInt(formData.practical) : null,
          written: formData.written ? parseInt(formData.written) : null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Result added successfully ✅");
      setFormData({
        examType: "",
        subject: "",
        mcq: "",
        practical: "",
        written: "",
      });
    } catch (err) {
      console.error("Error adding result:", err);
      setMessage("Failed to add result ❌");
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-sky-700">
          Add Result {group && `- ${group}`}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Exam Type */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Exam Type
            </label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            >
              <option value="">-- Select Exam Type --</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Final">Final</option>
              <option value="Test">Test</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.name}>
                  {subj.name}
                </option>
              ))}
            </select>
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
            />
          </div>

          {/* Practical */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Practical Marks
            </label>
            <input
              type="number"
              name="practical"
              value={formData.practical}
              onChange={handleChange}
              placeholder="Enter Practical Marks"
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
            />
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center font-semibold ${
                error ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-3 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700"
            >
              Save Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// trsiha

