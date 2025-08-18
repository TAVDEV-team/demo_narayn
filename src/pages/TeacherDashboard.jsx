import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://narayanpur-high-school.onrender.com/api/user/teachers/1/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTeacher(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeacher();
  }, []);

  if (!teacher) {
    return (
      <div className="min-h-screen flex justify-center bg-sky-50 items-center">
       <p className="flex items-center gap-2 text-2xl font-bold text-sky-700">
  <svg
    className="animate-spin h-5 w-5 text-sky-700"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
  Loading students...
</p>

      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white border rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-6 border-b pb-6 mb-6">
        <img
          src={teacher.account.image}
          alt="Teacher"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">{teacher.account.full_name}</h2>
          <p className="text-gray-600">{teacher.account.email}</p>
          <p className="text-gray-600">Mobile: {teacher.account.mobile}</p>
        </div>
      </div>

      {/* Profile Info */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-gray-700">
        <p><span className="font-medium">Subject:</span> {teacher.base_subject_detail?.name}</p>
        <p><span className="font-medium">Designation:</span> {teacher.designation || "-"}</p>
        <p><span className="font-medium">Gender:</span> {teacher.account.gender}</p>
        <p><span className="font-medium">Religion:</span> {teacher.account.display_religion}</p>
        <p><span className="font-medium">Date of Birth:</span> {teacher.account.date_of_birth}</p>
        <p><span className="font-medium">Joining Date:</span> {teacher.account.joining_date}</p>
        <p><span className="font-medium">Last Institute:</span> {teacher.account.last_educational_institute}</p>
        <p><span className="font-medium">Address:</span> {teacher.account.address}</p>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/student")}
          className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
        >
          ➕ Add Student
        </button>
        <button
          onClick={() => navigate("/notices-create")}
          className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
        >
          📢 Add Notice
        </button>
        <button
          onClick={() => navigate("/portal")}
          className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
        >
          📊 Add Result
        </button>
      </div>
    </div>
  );
}
