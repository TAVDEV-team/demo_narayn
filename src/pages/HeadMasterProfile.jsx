// src/pages/HeadMasterProfile.jsx
import React, { useEffect, useState } from "react";

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
    return <div className="text-center mt-10 text-xl">Loading headmaster...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const acc = headmaster.account.account; // inner account object
  const subject = headmaster.account.base_subject_detail;
  const classInfo = headmaster.account.class_teacher_of_detail;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={acc.image }
          alt={acc.full_name}
          className="w-40 h-40 rounded-full object-cover border-2 border-blue-400"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{acc.full_name}</h1>
          <p className="text-gray-600">{acc.address}</p>
          <p className="text-gray-600">{acc.religion}</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Personal Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div><strong>Email:</strong> {acc.user.email}</div>
          <div><strong>Mobile:</strong> {acc.mobile}</div>
          <div><strong>Date of Birth:</strong> {new Date(acc.date_of_birth).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Professional Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div><strong>Joining Date:</strong> {new Date(headmaster.appointed_date).toLocaleDateString()}</div>
          <div><strong>Last Education:</strong> {acc.last_educational_institute}</div>
          <div><strong>Base Subject:</strong> {subject.name}</div>
        </div>
      </div>

      {/* Class Teacher Info */}
      {headmaster.account.is_class_teacher && classInfo && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Class Teacher Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div><strong>Class:</strong> {classInfo.name}</div>
            <div><strong>Room Number:</strong> {classInfo.room_number}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadMasterProfile;
