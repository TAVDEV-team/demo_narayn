import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaIdBadge } from "react-icons/fa";

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
        if (group) {
          // Case: Class with group (9/10)
          filtered = res.data.filter(
            (student) =>
              student.aclass === `Class ${grade}` &&
              student.group &&
              student.group.toLowerCase() === group.toLowerCase()
          );
        } else {
          // Case: Class without group (6/7/8)
          filtered = res.data.filter(
            (student) => student.aclass === `Class ${grade}`
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
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 mt-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Class {grade}
          {group ? ` - ${group.charAt(0).toUpperCase() + group.slice(1)}` : ""} Students
        </h1>

        {students.length === 0 ? (
          <p className="text-gray-500 text-center">
            No students found {group ? `for ${group}` : ""}.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.account.id}
                className="flex flex-col items-center bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={student.account.image}
                  alt={student.account.full_name}
                  className="w-32 h-32 object-cover mt-4 rounded-full border-4 border-indigo-200"
                />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {student.account.full_name?.trim()
                      ? student.account.full_name
                      : student.account.user.username}
                  </h2>
                  <p className="text-gray-600">Roll: {student.roll_number}</p>
                  {/* <p className="text-gray-600">
                    Mobile: {student.account.mobile}
                  </p>
                  <p className="text-gray-600">
                    Email: {student.account.user.email || "N/A"}
                  </p> */}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
