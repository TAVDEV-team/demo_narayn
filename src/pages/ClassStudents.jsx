import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ClassStudents() {
  const { grade } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/user/students/")
      .then((res) => {
        // Assuming backend has a field like `class_grade` or `class`
        const filtered = res.data.filter(
          (student) => String(student.class_grade) === String(grade)
        );
        setStudents(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, [grade]);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 mt-20">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Students of Class {grade}
        </h1>
        <Link
          to="/portal"
          className="text-indigo-600 hover:underline text-sm"
        >
          ← Back to Classes
        </Link>
      </div>

      {students.length === 0 ? (
        <p className="text-center text-gray-500">No students found for this class.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="rounded-lg shadow-md border border-gray-200 bg-white p-6 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {student.name}
              </h2>
              <p className="text-sm text-gray-500">Roll: {student.roll_number}</p>
              <p className="text-sm text-gray-500">Class: {student.class_grade}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
