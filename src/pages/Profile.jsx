import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MapPin, Landmark, Mail, Phone, Calendar, GraduationCap,
  BookOpen, UserPlus, Wallet, FileClock, X, LogOut
} from "lucide-react";
import { div } from "framer-motion/client";
const endpoints = {
  Teacher: "https://narayanpur-high-school.onrender.com/api/user/teachers/",
  Student: "https://narayanpur-high-school.onrender.com/api/user/students/",
  Governing: "https://narayanpur-high-school.onrender.com/api/user/governing/",
  Office_Helper: "https://narayanpur-high-school.onrender.com/api/user/office-helpers/",
};

export async function fetchProfessionalAccount(account_id) {
  for (const [role, url] of Object.entries(endpoints)) {
    try {
      const res = await axios.get(url);
      const targetId = Number(account_id);
      const account = res.data.find(t => t.account.id === targetId);


      if (account) {
        return { account, role };
      }
    } catch (err) {
      console.error(`❌ Failed to fetch ${role}:`, err.message);
    }
  }

  console.warn("⚠️ No matching account found.");
  return null;
}
{/* ---------------- DASHBOARD COMPONENT ---------------- */ }
const AccountDashboard = () => {
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // 🔹 Fetch teacher profile
  useEffect(() => {
    const fetchAccount = async () => {
      let token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const accountId = localStorage.getItem("accountId");

      if (!token || !accountId) {
        navigate("/login");
        return;
      }

      try {
        const { account, role } = await fetchProfessionalAccount(accountId);
        setAccount(account);
        setRole(role);
      } catch (err) {
        if (err.response?.status === 401 && refreshToken) {
          try {
            const refreshRes = await axios.post(
              "https://narayanpur-high-school.onrender.com/api/user/token/refresh/",
              { refresh: refreshToken }
            );
            token = refreshRes.data.access;
            localStorage.setItem("token", token);

            const { account, role } = await fetchProfessionalAccount(accountId);
            setAccount(account);
            setRole(role);
          } catch {
            navigate("/login");
          }
        } else {
          setAccount(null);
          setRole(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [navigate]);

  // 🔹 Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(
        "https://narayanpur-high-school.onrender.com/api/user/logout/",
        { method: "POST", headers: { Authorization: `Token ${token}` } }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.clear();
      setIsLoggingOut(false);
      navigate("/login");
    }
  };

  if (loading)
    return (
      <p className="text-center text-2xl mt-32 animate-pulse">
        ⏳ Loading...
      </p>
    );
  if (!account)
    return (
      <p className="text-center text-red-600 mt-20">❌ profile not found</p>
    );

  return (
    <section className="bg-sky-100 min-h-screen flex mt-10">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-indigo-900 text-white shadow-xl flex-col py-10 mb-10">
        <div className="px-6">
          <nav className="space-y-3">
            <h2 className="text-2xl font-bold tracking-wide mb-8 text-center">
              Dashboard
            </h2>

            <DashboardItems
              account={account}
              role={role}
              navigate={navigate}
              handleLogout={handleLogout}
              isLoggingOut={isLoggingOut}
            />
          </nav>
        </div>
      </aside>

      {/* Right Content (Mobile + Main) */}
      <div className="flex-1">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-indigo-900 text-white shadow py-8">
          <button onClick={() => setSidebarOpen(true)}>
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

              {/* Reuse the same dashboard items */}
              <DashboardItems
                account={account}
                role={role}
                navigate={(path) => {
                  setSidebarOpen(false);
                  navigate(path);
                }}
                handleLogout={handleLogout}
                isLoggingOut={isLoggingOut}
              />
            </aside>
          </div>
        )}

        {/* Main dashboard */}
        <main className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
          <PersonalInfo account={account.account} />
        </main>
      </div>
    </section>
  );
};
const PersonalInfo = ({ account }) => {

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 mb-8">
        <img
          src={account.image || "/default.png"}
          alt="Teacher"
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-indigo-200 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {account.full_name}
          </h2>
          <div className="mt-2 flex flex-col gap-1 text-gray-700">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-700" />
              {account.user.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-700" />
              {account.mobile || "-"}
            </p>
          </div>

        </div>
      </div>

      <div>
        {/* Profile info */}
        <h3 className="text-xl font-semibold text-gray-800 mb-5">
          Profile Information
        </h3>
        <PersonalInfoText
        account={account}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-800 my-5">
          Extra Information
        </h3>

          <ProfessionalInfo
            id={account.id}
          />
      </div>
    </div>
  );
};

const PersonalInfoText = ({account}) =>{
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
          <ProfileItem
            icon={<Landmark className="w-5 h-5 text-blue-700" />}
            label="Religion"
            value={account.display_religion || "-"}
          />
          <ProfileItem
            icon={<Calendar className="w-5 h-5 text-blue-700" />}
            label="Date of Birth"
            value={account.date_of_birth || "-"}
          />
          <ProfileItem
            icon={<Calendar className="w-5 h-5 text-blue-700" />}
            label="Joining Date"
            value={account.joining_date || "-"}
          />
          <ProfileItem
            icon={<GraduationCap className="w-5 h-5 text-blue-700" />}
            label="Last Institute"
            value={account.last_educational_institute || "-"}
          />
          <ProfileItem
            icon={<MapPin className="w-5 h-5 text-blue-700" />}
            label="Address"
            value={account.address || "-"}
          />
          <ProfileItem
            icon={<MapPin className="w-5 h-5 text-blue-700" />}
            label="Gender"
            value={account.display_gender || "-"}
          />
        </div>
  )
}

const ProfessionalInfo = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchProfessionalAccount(id).then((res) => {
      if (mounted) setData(res);
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!data) {
    return <p className="text-gray-500">Loading professional info...</p>;
  }

  const { account, role } = data;

  if (role === "Student") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
        <ProfileItem
          icon={<BookOpen className="w-5 h-5 text-blue-700" />}
          label="Class"
          value={account.aclass || ""}
        />
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Roll No"
          value={account.roll_number || "-"}
        />
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Batch"
          value={account.batch_label || "-"}
        />
      </div>
    );
  }

  if (role === "Governing") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Position"
          value={account.position || "-"}
        />
      </div>
    );
  }
  if (role === "Teacher") {
     return (
     <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 text-gray-700"> 
     <ProfileItem icon={<BookOpen className="w-5 h-5 text-blue-700" />
     } 
     label="Subject" 
     value={account.base_subject_detail?.name || "-"} 
     /> 
     <ProfileItem icon={<BookOpen className="w-5 h-5 text-blue-700" />} label="Class Teacher" value={account.class_teacher_of || "-"} /> 
     <ProfileItem icon={<UserPlus className="w-5 h-5 text-blue-700" />} label="Designation" value={account.designation || "Teacher"} />
      </div>); }
  if (role === "Office_Helper") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Duty"
          value={account.duty || "-"}
        />
      </div>
    );
  }

  return <p className="text-gray-500">No professional info available.</p>;
}

const DashboardItems = ({ account, role, navigate, handleLogout, isLoggingOut }) => {
  return (
    <div>
      {/* Conditional rendering for Headmaster */}
      {account.is_headmaster && <HeadmasterDashboard navigate={navigate} />}

      {/* Role-based dashboards */}
      {role === "Teacher" && <TeacherDashboard navigate={navigate} />}
      {role === "Office_Helper" && <OfficeHelperDashboard navigate={navigate} />}

      {/* Always visible */}
      <SidebarButton
        label={isLoggingOut ? "Logging out..." : "Logout"}
        icon={<LogOut className="w-5 h-5" />}
        onClick={handleLogout}
      />
    </div>
  );
};

const OfficeHelperDashboard = ({ navigate }) => (
  <SidebarButton
    icon={<FileClock className="w-5 h-5" />}
    label="Add Notice"
    onClick={() => navigate("/notices-create")}
  />
);

const TeacherDashboard = ({ navigate }) => (
  <div>
    <SidebarButton
      icon={<UserPlus className="w-5 h-5" />}
      label="Add Student"
      onClick={() => navigate("/student")}
    />
    <SidebarButton
      icon={<GraduationCap className="w-5 h-5" />}
      label="Add Result"
      onClick={() => navigate("/add-result")}
    />
    <OfficeHelperDashboard navigate={navigate} />
  </div>
);

const HeadmasterDashboard = ({ navigate }) => (
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
);


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

export default AccountDashboard;
