// src/pages/HeadMasterProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    <div className="flex min-h-screen bg-gray-50 mt-20">
      {/* Left Sidebar */}
      <aside className="w-64 bg-blue-950 shadow-lg p-6 flex flex-col justify-start h-screen">
        <h2 className="text-xl font-bold text-white mb-6">Menu</h2>
        <button
          onClick={() => navigate("/register")}
          className="flex items-center gap-3 text-white mb-4 hover:text-blue-600"
        >
          <UserPlus className="w-5 h-5" /> Teacher Register
        </button>
        <button
          onClick={() => navigate("/fund")}
          className="flex items-center gap-3 text-white mb-4 hover:text-blue-600"
        >
          <Wallet className="w-5 h-5" /> Fund
        </button>
        <button
          onClick={() => navigate("/notice-pending")}
          className="flex items-center gap-3 text-white mb-4 hover:text-blue-600"
        >
          <FileClock className="w-5 h-5" /> Pending Notice
        </button>
      </aside>

      {/* Right Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header Section */}
        <section className="text-blue-950">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={acc.image || "https://via.placeholder.com/150"}
              alt={acc.full_name || "Headmaster"}
              className="w-44 h-44 rounded-full object-cover border-4 border-blue-950 shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-extrabold mb-3">{acc.full_name || "N/A"}</h1>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {acc.address || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Landmark className="w-5 h-5" /> {acc.religion || "N/A"}
              </p>
            </div>
          </div>
        </section>

        {/* Personal Info */}
        <section className="bg-white py-10 shadow-sm rounded-xl">
          <h2 className="text-2xl font-bold text-blue-950 mb-4 border-b-2 border-blue-950 pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-950">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" /> <span><strong>Email:</strong> {user.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" /> <span><strong>Mobile:</strong> {acc.mobile || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" /> <span><strong>DOB:</strong> {acc.date_of_birth ? new Date(acc.date_of_birth).toLocaleDateString() : "N/A"}</span>
            </div>
          </div>
        </section>

        {/* Professional Info */}
        <section className="bg-white py-10 shadow-sm rounded-xl">
          <h2 className="text-2xl font-bold text-blue-950 mb-4 border-b-2 border-blue-950 pb-2">
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-950">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />{" "}
              <span><strong>Joining Date:</strong> {headmaster.appointed_date ? new Date(headmaster.appointed_date).toLocaleDateString() : "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5" /> <span><strong>Last Education:</strong> {acc.last_educational_institute || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" /> <span><strong>Base Subject:</strong> {subject.name || "N/A"}</span>
            </div>
          </div>
        </section>

        {/* Class Teacher Info */}
        {teacher.is_class_teacher && classInfo && (
          <section className="bg-white py-10 shadow-sm rounded-xl">
            <h2 className="text-2xl font-bold text-blue-950 mb-4 border-b-2 border-blue-950 pb-2">
              Class Teacher Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-950">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" /> <span><strong>Class:</strong> {classInfo.name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5" /> <span><strong>Room:</strong> {classInfo.room_number || "N/A"}</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
