import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RoutineForm() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState(null); // ✅ backend message

  const [form, setForm] = useState({
    aclass: "",
    day: "",
    slot: "",
    subject: "",
    teacher: "",
  });

  // Fetch classes and teachers
  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/nphs/classes/")
      .then((res) => setClasses(res.data))
      .catch(() => {});

    axios
      .get("https://narayanpur-high-school.onrender.com/api/user/teachers/")
      .then((res) => setTeachers(res.data))
      .catch(() => {});
  }, []);

  // Fetch subjects when class selected
  useEffect(() => {
    if (form.aclass) {
      axios
        .get(
          `https://narayanpur-high-school.onrender.com/api/nphs/classes/${form.aclass}/`
        )
        .then((res) => setSubjects(res.data.all_subjects || []))
        .catch(() => {});
    } else {
      setSubjects([]);
    }
  }, [form.aclass]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://narayanpur-high-school.onrender.com/api/nphs/routine/",
        form
      );

      setMessage({ type: "success", text: res.data.message || "Routine created successfully!" });
      setForm({ aclass: "", day: "", slot: "", subject: "", teacher: "" });
      setSubjects([]);
    } catch (err) {
      setMessage({
  type: "error",
  text: JSON.stringify(err.response?.data) || "Error creating routine",
});

    }
  };

  const days = ["SAT", "SUN", "MON", "TUES", "WED", "THURS"];
  const slots = [
    { id: 1, time: "9:00 - 10:00" },
    { id: 2, time: "10:00 - 11:00" },
    { id: 3, time: "11:00 - 12:00" },
    { id: 4, time: "12:00 - 1:00" },
    { id: 5, time: "2:00 - 3:00" },
    { id: 6, time: "3:00 - 4:00" },
  ];

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-950 text-center mb-6">
          Create Class Routine
        </h2>

        {/* ✅ Show backend message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Class
            </label>
            <select
              name="aclass"
              value={form.aclass}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-950 focus:outline-none"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Day */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Day
            </label>
            <select
              name="day"
              value={form.day}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-950 focus:outline-none"
            >
              <option value="">Select Day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Slot */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Class Duration
            </label>
            <select
              name="slot"
              value={form.slot}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-950 focus:outline-none"
            >
              <option value="">Select Time</option>
              {slots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.time}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Subject
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-950 focus:outline-none"
              disabled={!form.aclass}
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              Teacher
            </label>
            <select
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-950 focus:outline-none"
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.account?.full_name ||
                    `${t.account?.user?.first_name} ${t.account?.user?.last_name}`}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-950 text-white font-semibold py-3 rounded-xl shadow hover:bg-blue-900 transition duration-200"
          >
            Save Routine
          </button>
        </form>
      </div>
    </div>
  );
}
