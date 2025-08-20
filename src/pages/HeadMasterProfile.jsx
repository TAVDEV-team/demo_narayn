// src/pages/HeadMasterProfile.jsx
import React, { useEffect, useState } from "react";
import { Loader2, Mail, Phone, Calendar, BookOpen, GraduationCap, MapPin, Landmark } from "lucide-react";

const HeadMasterProfile = () => {
  const [headmaster, setHeadmaster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadmaster = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://narayanpur-high-school.onrender.com/api/user/headmaster/",
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (data.length > 0) setHeadmaster(data[0]);
        else setError("No headmaster data found");
      } catch (err) {
        console.error(err);
        setError("Failed to load headmaster data");
      } finally {
        setLoading(false);
      }
    };

    fetchHeadmaster();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-blue-950 mt-3 text-lg">Loading headmaster profile...</p>
      </div>
    );

  if (error)
    return <div className="text-center mt-10 text-red-500 text-lg">{error}</div>;

  const acc = headmaster.account.account;
  const subject = headmaster.account.base_subject_detail;
  const classInfo = headmaster.account.class_teacher_of_detail;

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className=" text-blue-950 py-10 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 px-6">
          <img
            src={acc.image}
            alt={acc.full_name}
            className="w-44 h-44 rounded-full object-cover border-4 border-blue-950 shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-extrabold mb-3">{acc.full_name}</h1>
            <p className="flex items-center gap-2 text-blue-950">
              <MapPin className="w-5 h-5 text-blue-950" /> {acc.address}
            </p>
            <p className="flex items-center gap-2 text-blue-950">
              <Landmark className="w-5 h-5 text-blue-950" /> {acc.religion}
            </p>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-blue-950 mb-6 border-b-2 border-blue-950 pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-950">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span><strong>Email:</strong> {acc.user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span><strong>Mobile:</strong> {acc.mobile}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <span><strong>Date of Birth:</strong> {new Date(acc.date_of_birth).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Info */}
      <section className="bg-white text-blue-950 py-14 ">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-blue-950 mb-6 border-b-2 border-blue-950 pb-2">
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <span><strong>Joining Date:</strong> {new Date(headmaster.appointed_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5" />
              <span><strong>Last Education:</strong> {acc.last_educational_institute}</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              <span><strong>Base Subject:</strong> {subject.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Class Teacher Info */}
      {headmaster.account.is_class_teacher && classInfo && (
        <section className="bg-white py-14">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-blue-950 mb-6 border-b-2 border-blue-950 pb-2">
              Class Teacher Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-950">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                <span><strong>Class:</strong> {classInfo.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5" />
                <span><strong>Room Number:</strong> {classInfo.room_number}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HeadMasterProfile;
