// src/pages/HeadMasterProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const [sidebarOpen, setSidebarOpen] = useState(false);

import {
  MapPin,
  Landmark,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  BookOpen,
  UserPlus,
  Wallet,
  FileClock,
  Loader2,
} from "lucide-react";




export default function HeadMasterProfile() {
  const [headmaster, setHeadmaster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/user/headmaster/")
      .then((res) => {
        console.log("API response:", res.data);
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        if (data) setHeadmaster(data);
        else setError("No headmaster data found");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch headmaster data");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-blue-950 mt-3 text-lg">Loading headmaster profile...</p>
      </div>
    );

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!headmaster) return <p className="text-center mt-10">No data available</p>;

  const teacher = headmaster.teacher || {};
  const acc = teacher.account || {};
  const user = acc.user || {};
  const subject = teacher.base_subject_detail || {};
  const classInfo = teacher.class_teacher_of_detail || null;

  return (
    <div className="flex min-h-screen bg-sky-50 py-16 ">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-indigo-900 text-white shadow-lg flex-col ">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold tracking-wide mb-8">Principle Menu</h2>
          <nav className="space-y-4">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition  border shadow-lg"
            >
              <UserPlus className="w-5 h-5" /> Teacher Register
            </button>
            <button
              onClick={() => navigate("/fund")}
              className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition  border shadow-lg"
            >
              <Wallet className="w-5 h-5" /> Fund
            </button>
            <button
              onClick={() => navigate("/notice-pending")}
              className="flex items-center gap-3 w-full py-2 px-3 rounded-lg hover:bg-white hover:text-blue-950 hover:border-red-500 transition  border shadow-lg"
            >
              <FileClock className="w-5 h-5" /> Pending Notice
            </button>
          </nav>
        </div>
      </aside>



      {/* Main Content */}

      <main className="flex-1 p-10 space-y-10 mx-auto max-w-2xl">
      <section className="bg-white rounded-2xl shadow-md p-8 gap-6 md:flex-row md:items-start">
        <img
          src={acc.image || "https://via.placeholder.com/150"}
          alt={acc.full_name || "Headmaster"}
          className="w-40 h-40 my-2 rounded-full object-cover border-4 border-blue-950 shadow text-center"/>
        <div className=" md:text-left my-2  ">
          <h1 className="text-3xl font-extrabold text-blue-950 mb-3">
            {acc.full_name || "N/A"}
          </h1>
        </div>
      </section>


        {/* Personal Info */}
        <section className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-blue-950 mb-6 border-b pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-700" />
              <span><strong>Email:</strong> {user.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-700" />
              <span><strong>Mobile:</strong> {acc.mobile || "N/A"}</span>
            </div>


            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-700" /> <strong>Address:</strong>{acc.address || "N/A"}
            </div>
            <div className="flex items-center gap-3">
              <Landmark className="w-5 h-5 text-blue-700" /> <strong>Religion :</strong>{acc.display_religion || "N/A"}
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-700" />
              <span><strong>DOB:</strong> {acc.date_of_birth ? new Date(acc.date_of_birth).toLocaleDateString() : "N/A"}</span>
            </div>
          </div>

        </section>

        {/* Professional Info */}
        <section className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-blue-950 mb-6 border-b pb-2">
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-700" />
              <span><strong>Joining Date:</strong> {headmaster.appointed_date ? new Date(headmaster.appointed_date).toLocaleDateString() : "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-blue-700" />
              <span><strong>Last Education:</strong> {acc.last_educational_institute || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-700" />
              <span><strong>Base Subject:</strong> {subject.name || "N/A"}</span>
            </div>
          </div>
        </section>

        {/* Class Teacher Info */}
        {teacher.is_class_teacher && classInfo && (
          <section className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-blue-950 mb-6 border-b pb-2">
              Class Teacher Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-700" />
                <span><strong>Class:</strong> {classInfo.name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-blue-700" />
                <span><strong>Room:</strong> {classInfo.room_number || "N/A"}</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>

  );
}
