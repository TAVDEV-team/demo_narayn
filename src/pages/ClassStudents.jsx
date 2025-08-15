import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ClassStudents() {
  const { grade } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          "https://narayanpur-high-school.onrender.com/api/user/students/"
        );
        const filtered = res.data.filter(
          (student) => student.aclass === `Class ${grade}`
        );
        setStudents(filtered);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [grade]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Class {grade} Students
        </h1>
        {students.length === 0 ? (
          <p className="text-gray-500">No students found for this class.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">

            {students.map((student) => (
              <div
                key={student.account.id}
                className="flex bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                {/* Student Image */}
                <img
                  src={student.account.image}
                  alt={student.account.full_name}
                  className="w-32 h-32 object-cover"
                />

                {/* Student Info */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {student.account.full_name.trim()
                      ? student.account.full_name
                      : student.account.user.username}
                  </h2>
                  <p className="text-gray-600">
                    Roll: {student.roll_number}
                  </p>
                  <p className="text-gray-600">
                    Mobile: {student.account.mobile}
                  </p>
                  <p className="text-gray-600">
                    Email:{" "}
                    {student.account.user.email
                      ? student.account.user.email
                      : "N/A"}
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
