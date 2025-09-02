import React, { useState, useEffect } from "react";
import API from "../api/api";
import Loading from "../components/Loading";
export default function AddResult() {
  // Dropdown data
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  // Form state
  const [form, setForm] = useState({
    aclass: "",
    exam: "",
    subject: "",
    student: "",
    mcq: "",
    practical: "",
    written: "",
  });

  // Loading & message states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch classes + exams (only once)
  useEffect(() => {
    const fetchDropdowns = async () => {
      setLoading(true);
      try {
        const [classesRes, examsRes] = await Promise.all([
          API.get("/nphs/classes/"),
          API.get("/result/exam/"),
        ]);
        setClasses(classesRes.data);
        setExams(examsRes.data);
      } catch (error) {
        setMessage({ type: "error", text: "⚠️ Failed to fetch dropdown data." });
      } finally {
        setLoading(false);
      }
    };
    fetchDropdowns();
  }, []);

  // Fetch students + subjects when class is selected
  useEffect(() => {
    if (!form.aclass) return; // skip if no class selected
    const fetchClassDetails = async () => {
      try {
        setLoading(true);
        const res = await API.get(
          `/nphs/classes/${form.aclass}/`
        );
        setStudents(res.data.students || []);
        setSubjects(res.data.all_subjects || []); // ✅ subjects come from here
      } catch (error) {
        setMessage({ type: "error", text: "⚠️ Failed to fetch students/subjects for this class." });
        setStudents([]);
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClassDetails();
  }, [form.aclass]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        ...form,
        aclass: Number(form.aclass),
        exam: Number(form.exam),
        subject: Number(form.subject),
        student: Number(form.student),
        mcq: Number(form.mcq),
        practical: Number(form.practical),
        written: Number(form.written),
      };
      console.log("Payload:", JSON.stringify(payload, null, 2));

      await API.post("/result/", payload);
      setMessage({ type: "success", text: "✅ Result added successfully!" });
      setForm({ aclass: "", exam: "", subject: "", student: "", mcq: "", practical: "", written: "" });
      setStudents([]);
      setSubjects([]);
    } catch (error) {
      if (error.response) {
        console.log("Backend error:", error.response.data);
        setMessage({ type: "error", text: JSON.stringify(error.response.data) });
      } else if (error.request) {
        setMessage({ type: "error", text: "⚠️ No response from server." });
      } else {
        setMessage({ type: "error", text: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="flex justify-center items-start py-10 bg-sky-100 min-h-screen px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 mt-10">
          Add Student Result
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Class</label>
            <select
              name="aclass"
              value={form.aclass}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Exam dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Exam</label>
            <select
              name="exam"
              value={form.exam}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Exam</option>
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.exam_title}
                </option>
              ))}
            </select>
          </div>

          {/* Subject dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
              disabled={!form.aclass}
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Student dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Student</label>
            <select
              name="student"
              value={form.student}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
              disabled={!form.aclass}
            >
              <option value="">Select Student</option>
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.roll_number
                    ? `${st.roll_number} - ${st.account.full_name}`
                    : st.account.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Score inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">MCQ Marks</label>
              <input
                type="number"
                name="mcq"
                value={form.mcq}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Enter MCQ Marks"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Practical Marks</label>
              <input
                type="number"
                name="practical"
                value={form.practical}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Enter Practical Marks"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Written Marks</label>
              <input
                type="number"
                name="written"
                value={form.written}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Enter Written Marks"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-950 text-white font-semibold py-2 rounded-lg hover:bg-blue-900 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Loading message="Submitting"/> : "Submit Result"}
          </button>

          {/* Feedback message */}
          {message.text && (
            <p
              className={`text-center mt-4 font-medium ${
                message.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
    
  );
}
