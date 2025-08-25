import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Routine() {
  const [selectedClass, setSelectedClass] = useState(null); // class selected
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const classes = [6, 7, 8, 9, 10];

  // Fetch routine for a given class
  const fetchRoutine = async (classNum) => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await axios.get(
        `https://narayanpur-high-school.onrender.com/api/nphs/routine/${classNum}/`
      );
      setRoutine(res.data); // assumes backend returns an array of routine entries
      setSelectedClass(classNum);
      setStatus("success");
    } catch (err) {
      console.error("Error fetching routine:", err);
      setRoutine([]);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-sky-900 mb-12"
        >
          📅 School Routine
        </motion.h1>

        {/* Class Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => fetchRoutine(cls)}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                selectedClass === cls
                  ? "bg-sky-700 text-white"
                  : "bg-sky-200 text-sky-900 hover:bg-sky-300"
              }`}
            >
              Class {cls}
            </button>
          ))}
        </div>

        {/* Routine Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading && <p className="text-blue-600">⏳ Loading routine...</p>}
          {status === "error" && (
            <p className="text-red-600">❌ Failed to fetch routine.</p>
          )}
          {!loading && status === "success" && routine.length === 0 && (
            <p className="text-gray-600">No routine available for Class {selectedClass}.</p>
          )}

          {!loading &&
            routine.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2"
              >
                <h3 className="font-semibold text-sky-800 text-lg">{item.subject}</h3>
                <p className="text-gray-700">
                  Teacher: <span className="font-medium">{item.teacher}</span>
                </p>
                <p className="text-gray-700">
                  Time: <span className="font-medium">{item.time}</span>
                </p>
                <p className="text-gray-700">
                  Room: <span className="font-medium">{item.room}</span>
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
