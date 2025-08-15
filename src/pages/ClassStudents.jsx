import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaIdBadge } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white bg-blue-950 py-3 px-6 rounded-lg shadow-lg mb-8 text-center">
  🎓 Class {grade} Students
</h1>


        {students.length === 0 ? (
          <p className="text-gray-500 text-center">No students found for this class.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {students.map((student) => (
              <div
                key={student.account.id}
                className="flex flex-col md:flex-row items-center bg-slate-200 rounded-xl shadow-md hover:shadow-2xl transition duration-300 border border-gray-200 overflow-hidden"
              >
                {/* Info Left */}
                <div className="flex-1 px-6 py-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {student.account.full_name.trim()
                      ? student.account.full_name
                      : student.account.user.username}
                  </h2>
                  <div className="mt-3 space-y-2">
                    <p className="flex items-center text-gray-600">
                      <FaIdBadge className="mr-2 " /> Roll: {student.roll_number}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaPhoneAlt className="mr-2 " /> {student.account.mobile}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-2 " />{" "}
                      {student.account.user.email ? student.account.user.email : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Image Right */}
                <div className="p-4">
                  <img
                    src={student.account.image}
                    alt={student.account.full_name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
