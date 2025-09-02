import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../api/api"
import Loading from "../components/Loading";
export default function TeacherInformation() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await API.get(
          "/user/teachers/"
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
   <Loading
   message="Loading Teachers"/>
  }

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4">
      <div className="max-w-6xl mx-auto mt-6 space-y-10">

        <div className="rounded-xl text-center mt-8 p-6">
          <h1 className="text-lg sm:text-xl rounded-xl mt-8 p-6  bg-blue-950 text-stone-50 font-bold ">Teacher Information</h1>
        </div>
        {/* Teacher cards */}
        {teachers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No teachers found.</p>
        ) : (
          <div className="space-y-6">
            {teachers.map((teacher) => (
              <div
                key={teacher.account.id}
                className="flex bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200 p-4"
              >
                {/* Left side image */}
                <div className="w-32 h-32 flex-shrink-0 mx-2">
                  <img
                    src={teacher.account.image || "/default.png"}
                    alt={teacher.account.full_name || teacher.account.user.username}
                    className="w-full  rounded-nonew-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-indigo-200"
                  />
                </div>

                {/* Right side info (all aligned vertically to far right) */}
                <div className="flex-1 p-4 flex flex-col justify-center ml-auto text-left space-y-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {teacher.account.full_name?.trim() || teacher.account.user.username}
                  </h2>
                  {teacher.account.user.email && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span> {teacher.account.user.email}
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
                <div className="flex-1 p-4 flex flex-col justify-center ml-auto text-left space-y-1">
                  {teacher.account.display_religion && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Religion:</span> {teacher.account.display_religion}
                    </p>
                  )}
                  {teacher.base_subject_detail && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Subject:</span> {teacher.base_subject_detail.name}
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
