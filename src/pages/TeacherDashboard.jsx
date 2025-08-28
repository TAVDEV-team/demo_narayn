import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MapPin, Landmark, Mail, Phone, Calendar, GraduationCap,
  BookOpen, UserPlus, Wallet, FileClock, Menu, X,
} from "lucide-react";
import { div } from "framer-motion/client";


const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        const res = await axios.get(
          `https://narayanpur-high-school.onrender.com/api/user/teachers/${teacherId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTeacher(res.data);
      } catch (err) {
        if (err.response?.status === 401 && refreshToken) {
          try {
            const refreshRes = await axios.post(
              "https://narayanpur-high-school.onrender.com/api/user/token/refresh/",
              { refresh: refreshToken }
            );
            token = refreshRes.data.access;
            localStorage.setItem("token", token);

            const retryRes = await axios.get(
              `https://narayanpur-high-school.onrender.com/api/user/teachers/${teacherId}/`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setTeacher(retryRes.data);
          } catch {
            navigate("/login");
          }
        } else {
          setTeacher(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [navigate]);

  if (loading)
    return (
      <p className="text-center text-2xl mt-32 animate-pulse">⏳ Loading...</p>
    );
  if (!teacher)
    return (
      <p className="text-center text-red-600 mt-20">
        ❌ Teacher profile not found
      </p>
    );

  return (
<section className="bg-sky-100 min-h-screen flex mt-10">
  {/* Desktop Sidebar */}
<aside className="hidden md:flex w-64 bg-indigo-900 text-white shadow-xl flex-col py-10">
  <div className="px-6">
    <nav className="space-y-3">
      <h2 className="text-2xl font-bold tracking-wide mb-8 text-center">
        Menu
      </h2>

      {/* Conditional rendering for Headmaster */}
      {teacher.is_headmaster && (
        <div>
          <SidebarButton
            icon={<UserPlus className="w-5 h-5" />}
            label="Add Staffs"
            onClick={() => navigate("/add-staffs")}
          />
          <SidebarButton
            icon={<UserPlus className="w-5 h-5" />}
            label="Teacher Register"
            onClick={() => navigate("/register")}
          />
          <SidebarButton
            icon={<Wallet className="w-5 h-5" />}
            label="Fund"
            onClick={() => navigate("/fund")}
          />
          <SidebarButton
            icon={<FileClock className="w-5 h-5" />}
            label="Pending Notice"
            onClick={() => navigate("/notice-pending")}
          />
          <SidebarButton
            icon={<BookOpen className="w-5 h-5" />}
            label="Routine"
            onClick={() => navigate("/update-routine")}
          />
        </div>
      )}

      {/* Always visible */}
      <SidebarButton
        icon={<UserPlus className="w-5 h-5" />}
        label="Add Student"
        onClick={() => navigate("/student")}
      />
      <SidebarButton
        icon={<FileClock className="w-5 h-5" />}
        label="Add Notice"
        onClick={() => navigate("/notices-create")}
      />
      <SidebarButton
        icon={<GraduationCap className="w-5 h-5" />}
        label="Add Result"
        onClick={() => navigate("/add-result")}
      />
    </nav>
  </div>
</aside>

  {/* Right Content (Mobile + Main) */}
  <div className="flex-1">
    {/* Mobile Topbar */}
    <div className="md:hidden flex items-center justify-between p-4 bg-indigo-900 text-white shadow py-8">
      
      <button onClick={() => setSidebarOpen(true)}>
        {/* <Menu className="w-7 h-7" /> */}
        <h1 className="font-bold text-lg">Dashboard</h1>
      </button>
    </div>

    {/* Mobile Sidebar Overlay */}
    {sidebarOpen && (
      <div className="fixed inset-0 z-50 flex">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar itself */}
        <aside className="relative w-64 bg-indigo-900 text-white p-6 flex flex-col z-50">
          {/* Close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="self-end mb-6"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Reuse same nav buttons */}
          <nav className="space-y-3">
            <SidebarButton
              icon={<UserPlus className="w-5 h-5" />}
              label="Teacher Register"
              onClick={() => {
                setSidebarOpen(false);
                navigate("/register");
              }}
            />
            <SidebarButton
              icon={<Wallet className="w-5 h-5" />}
              label="Fund"
              onClick={() => {
                setSidebarOpen(false);
                navigate("/fund");
              }}
            />
            <SidebarButton
              icon={<FileClock className="w-5 h-5" />}
              label="Pending Notice"
              onClick={() => {
                setSidebarOpen(false);
                navigate("/notice-pending");
              }}
            />
            <SidebarButton
              icon={<BookOpen className="w-5 h-5" />}
              label="Routine"
              onClick={() => {
                setSidebarOpen(false);
                navigate("/update-routine");
              }}
            />
            <SidebarButton
              icon={<UserPlus className="w-5 h-5" />}
              label="Add Student"
              onClick={() => {
                setSidebarOpen(false);
                navigate("/student");
              }}
            />
            <SidebarButton
              icon={<FileClock className="w-5 h-5" />}
              label="Add Notice"
              onClick={() => {
                setSidebarOpen(false);
                navigate("/notices-create");
              }}
            />
            <SidebarButton
              icon={<GraduationCap className="w-5 h-5" />}
              label="Add Result"
              onClick={() => {
                setSidebarOpen(false);
                navigate("/add-result");
              }}
            />
            <SidebarButton
              icon={<UserPlus className="w-5 h-5" />}
              label="Add Staffs"
              onClick={() => {
                setSidebarOpen(false);
                navigate("/add-staffs");
              }}
            />
          </nav>
        </aside>
      </div>
    )}

    {/* Main dashboard */}
    <main className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 mb-8">
        <img
          src={teacher.account.image || "/default.png"}
          alt="Teacher"
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-indigo-200 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {teacher.account.full_name}
          </h2>
          <div className="mt-2 flex flex-col gap-1 text-gray-700">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-700" />
              {teacher.account.user.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-700" />
              {teacher.account.mobile || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile info */}
      <h3 className="text-xl font-semibold text-gray-800 mb-5">
        Profile Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
        <ProfileItem
          icon={<BookOpen className="w-5 h-5 text-blue-700" />}
          label="Subject"
          value={teacher.base_subject_detail?.name || "-"}
        />
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Designation"
          value={teacher.designation || "-"}
        />
        <ProfileItem
          icon={<Landmark className="w-5 h-5 text-blue-700" />}
          label="Religion"
          value={teacher.account.display_religion || "-"}
        />
        <ProfileItem
          icon={<Calendar className="w-5 h-5 text-blue-700" />}
          label="Date of Birth"
          value={teacher.account.date_of_birth || "-"}
        />
        <ProfileItem
          icon={<Calendar className="w-5 h-5 text-blue-700" />}
          label="Joining Date"
          value={teacher.account.joining_date || "-"}
        />
        <ProfileItem
          icon={<GraduationCap className="w-5 h-5 text-blue-700" />}
          label="Last Institute"
          value={teacher.account.last_educational_institute || "-"}
        />
        <ProfileItem
          icon={<MapPin className="w-5 h-5 text-blue-700" />}
          label="Address"
          value={teacher.account.address || "-"}
        />
      </div>
    </main>
  </div>
</section>

  );
};

/* 🔹 Reusable sidebar button */
const SidebarButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full py-2 px-3 rounded-lg 
      hover:bg-white hover:text-indigo-900 transition-colors border border-transparent hover:border-indigo-200 shadow-md"
  >
    {icon}
    <span>{label}</span>
  </button>
);

/* 🔹 Reusable profile item */
const ProfileItem = ({ icon, label, value }) => (
  <p className="flex items-center gap-2">
    {icon}
    <span className="font-medium">{label}:</span>
    <span className="ml-1 text-gray-800">{value}</span>
  </p>
);

export default TeacherDashboard;
