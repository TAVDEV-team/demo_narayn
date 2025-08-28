import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Wallet, FileClock } from "lucide-react";
// import { faUser, faWallet, faFileClock } from '@fortawesome/free-solid-svg-icons';

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      let token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const teacherId = localStorage.getItem("teacherId");

      if (!token || !teacherId) {
        navigate("/login");
        return;
      }

      try {
        // Fetch teacher profile
        const res = await axios.get(
          `https://narayanpur-high-school.onrender.com/api/user/teachers/${teacherId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTeacher(res.data);

      } catch (err) {
        // If token expired, try refresh
        if (err.response?.status === 401 && refreshToken) {
          try {
            const refreshRes = await axios.post(
              "https://narayanpur-high-school.onrender.com/api/user/token/refresh/",
              { refresh: refreshToken }
            );
            token = refreshRes.data.access;
            localStorage.setItem("token", token);

            // Retry fetching teacher
            const retryRes = await axios.get(
              `https://narayanpur-high-school.onrender.com/api/user/teachers/${teacherId}/`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setTeacher(retryRes.data);
          } catch (refreshErr) {
            console.error("Refresh token failed:", refreshErr);
            navigate("/login");
          }
        } else {
          console.error("Failed to fetch teacher profile:", err);
          setTeacher(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [navigate]);

  if (loading) return <p className="text-center text-2xl mt-32">⏳ Loading...</p>;
  if (!teacher) return <p className="text-center text-red-600 mt-20">❌ Teacher profile not found</p>;

  return (
    <section className="bg-sky-100 min-h-screen flex mt-10">
      {/* Sidebar can go here */}
       <aside className="hidden md:flex w-64 bg-indigo-900 text-white shadow-lg flex-col">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold tracking-wide mb-8">Principle Menu</h2>
        <nav className="space-y-4">

          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition border shadow-lg"
          >
            <UserPlus className="w-5 h-5" /> Teacher Register
          </button>

          <button
            onClick={() => navigate("/fund")}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition border shadow-lg"
          >
            <Wallet className="w-5 h-5" /> Fund
          </button>

          <button
            onClick={() => navigate("/notice-pending")}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition border shadow-lg"
          >
            <FileClock className="w-5 h-5" /> Pending Notice
          </button>

          <button
            onClick={() => navigate("/update-routine")}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition border shadow-lg"
          >
            <FileClock className="w-5 h-5" /> Routine
          </button>

          <button
            onClick={() => navigate("/student")}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition border shadow-lg"
          >
            <UserPlus className="w-5 h-5" /> Add Student
          </button>

          <button
            onClick={() => navigate("/notices-create")}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition border shadow-lg"
          >
            <FileClock className="w-5 h-5" /> Add Notice
          </button>

          <button
            onClick={() => navigate("/add-result")}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition border shadow-lg"
          >
            <FileClock className="w-5 h-5" /> Add Result
          </button>

        </nav>
      </div>
    </aside>

      {/* Main dashboard */}
      <div className="flex-1 max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm ">
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b pb-6 mb-6">
          <img src={teacher.account.image || "/default.png"} alt="Teacher" className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border" />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{teacher.account.full_name}</h2>
            <p className="text-gray-600">{teacher.account.email}</p>
            <p className="text-gray-600">Mobile: {teacher.account.mobile || "-"}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-medium">Subject:</span> {teacher.base_subject_detail?.name || "-"}</p>
          <p><span className="font-medium">Designation:</span> {teacher.designation || "-"}</p>
          <p><span className="font-medium">Gender:</span> {teacher.account.gender || "-"}</p>
          <p><span className="font-medium">Religion:</span> {teacher.account.display_religion || "-"}</p>
          <p><span className="font-medium">DOB:</span> {teacher.account.date_of_birth || "-"}</p>
          <p><span className="font-medium">Joining Date:</span> {teacher.account.joining_date || "-"}</p>
          <p><span className="font-medium">Last Institute:</span> {teacher.account.last_educational_institute || "-"}</p>
          <p><span className="font-medium">Address:</span> {teacher.account.address || "-"}</p>
        </div>

        {/* <div className="mt-6 flex flex-wrap gap-4">
          <button onClick={() => navigate("/student")} className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900">Add Student</button>
          <button onClick={() => navigate("/notices-create")} className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900">Add Notice</button>
          <button onClick={() => navigate("/add-result")} className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900">Add Result</button>
        </div> */}
      </div>
    </section>
  );
};

export default TeacherDashboard;
