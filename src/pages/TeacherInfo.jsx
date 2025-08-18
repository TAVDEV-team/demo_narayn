import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherInformation() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(
          "https://narayanpur-high-school.onrender.com/api/user/teachers/"
        );
        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
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
          Loading teachers...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Heading section */}
        {/* Heading section without image */}
<div className=" rounded-xl p-6 text-center">
  <h1 className="text-3xl font-bold text-white bg-blue-950 inline-block px-60 py-2 rounded-md mb-4 mt-8">
    Teachers Information
  </h1>
  {/* <p className="text-gray-600 text-lg">
    Meet our dedicated and experienced teaching staff who are committed
    to providing the best education and guidance to our students.
  </p> */}
</div>


        {/* Teacher cards */}
   {teachers.length === 0 ? (
  <p className="text-center text-gray-500 text-lg">No teachers found.</p>
) : (
  <div className="space-y-6">
    {teachers.map((teacher) => (
      <div
        key={teacher.account.id}
        className="flex bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200"
      >
        {/* Left side image */}
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={teacher.account.image || "/default-avatar.png"}
            alt={teacher.account.full_name || teacher.account.user.username}
            className="w-full  rounded-nonew-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-indigo-200"
          />
        </div>

        {/* Right side info (all aligned vertically to far right) */}
        <div className="flex-1 p-4 flex flex-col justify-center ml-auto text-right space-y-1">
          <h2 className="text-xl font-semibold text-gray-800">
            {teacher.account.full_name?.trim() || teacher.account.user.username}
          </h2>
          {teacher.designation && (
            <p className="text-gray-600">
              <span className="font-semibold">Designation:</span> {teacher.designation}
            </p>
          )}
          {teacher.account.email && (
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {teacher.account.email}
            </p>
          )}
          {teacher.account.phone && (
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span> {teacher.account.phone}
            </p>
          )}
          {teacher.account.gender && (
            <p className="text-gray-600">
              <span className="font-semibold">Gender:</span> {teacher.account.gender}
            </p>
          )}
          {teacher.account.mobile && (
            <p className="text-gray-600">
              <span className="font-semibold">Mobile:</span> {teacher.account.mobile}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
}
