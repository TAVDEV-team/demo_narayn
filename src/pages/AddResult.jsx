import React, { useState, useEffect } from "react";
import axios from "axios";

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

// Fetch dropdown data (classes, exams, subjects only)
useEffect(() => {
  const fetchDropdowns = async () => {
    setLoading(true);
    try {
      const [classesRes, examsRes, subjectsRes] = await Promise.all([
        axios.get("https://narayanpur-high-school.onrender.com/api/nphs/classes/"),
        axios.get("https://narayanpur-high-school.onrender.com/api/result/exam/"),
        axios.get("https://narayanpur-high-school.onrender.com/api/nphs/subject/"),
      ]);
      setClasses(classesRes.data);
      setExams(examsRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      setMessage({ type: "error", text: "⚠️ Failed to fetch dropdown data." });
    } finally {
      setLoading(false);
    }
  };
  fetchDropdowns();
}, []);

// Fetch students when class is selected
useEffect(() => {
  if (!form.aclass) return; // if no class selected, skip
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://narayanpur-high-school.onrender.com/api/nphs/classes/${form.aclass}/`
      );
      // API should return class details + students
      setStudents(res.data.students || []);
      console.log(res.data.students)
    } catch (error) {
      setMessage({ type: "error", text: "⚠️ Failed to fetch students for this class." });
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };
  fetchStudents();
}, [form.aclass]);


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
  student: Number(form.student), // <-- just this, no .id
  mcq: Number(form.mcq),
  practical: Number(form.practical),
  written: Number(form.written),
};
console.log("Payload:", JSON.stringify(payload, null, 2));

      await axios.post("https://narayanpur-high-school.onrender.com/api/result/", payload);
      setMessage({ type: "success", text: "✅ Result added successfully!" });
      setForm({ aclass: 0, exam: 0, subject: 0, student: 0, mcq: 0, practical: 0, written: 0 });
    } catch (error) {
  if (error.response) {
    // Server responded with a status code
    console.log("Backend error:", error.response.data); // 👈 for debugging
    setMessage({ type: "error", text: JSON.stringify(error.response.data) });
  } else if (error.request) {
    setMessage({ type: "error", text: "⚠️ No response from server." });
  } else {
    setMessage({ type: "error", text: error.message });
  }
}

     finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">➕ Add Student Result</h2>

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
              {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
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
              {exams.map(ex => <option key={ex.id} value={ex.id}>{ex.exam_title}</option>)}
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
            >
              <option value="">Select Subject</option>
              {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
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
  {students.map(st => (
    <option key={st.id} value={st.id}>
      {st.roll_number ? `${st.roll_number} - ${st.account.full_name}` : st.account.full_name}
    </option>
  ))}
</select>

</div>


          {/* Score inputs grid */}
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
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {/* {loading ? "Submitting..." : "Submit Result"} */}
            submit
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
