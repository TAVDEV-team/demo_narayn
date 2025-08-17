import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ClassStudents() {
  const { grade, group } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          "https://narayanpur-high-school.onrender.com/api/user/students/"
        );

        let filtered;
if (group && group !== "all") {
  // Class with a real group (9/10)
  filtered = res.data.filter(
    (student) =>
      student.aclass.startsWith(`Class ${grade}`) &&
      student.group &&
      student.group.toLowerCase() === group.toLowerCase()
  );
} else {
  // Class without group OR redirected "all"
  filtered = res.data.filter(
    (student) => student.aclass.startsWith(`Class ${grade}`)
  );
}


        setStudents(filtered);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [grade, group]);

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
  Loading students...
</p>

      </div>
    );
  }

  return (
   <div className="min-h-screen bg-sky-50 py-10 px-4 mt-16">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center bg-blue-950 rounded-xl py-2 px-8 shadow-lg">
      Class {grade}
      {group ? ` - ${group.charAt(0).toUpperCase() + group.slice(1)}` : ""} 
    </h1>

    {/* Empty state */}
    {students.length === 0 ? (
      <p className="text-gray-500 text-center text-lg">
        No students found {group ? `for ${group}` : ""}.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
  key={student.account.id}
  className="flex flex-row items-center sm:items-start gap-4 bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200 p-5"
>

            {/* Student Image */}
            <img
              src={student.account.image || "/default-avatar.png"}
              alt={student.account.full_name || student.account.user.username}
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-indigo-200"
            />

            {/* Student Info */}
            <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-left flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {student.account.full_name?.trim() || student.account.user.username}
              </h2>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Roll:</span> {student.roll_number}
              </p>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Religion:</span> {student.account.display_religion}
              </p>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Gender:</span> {student.account.display_gender}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
}
