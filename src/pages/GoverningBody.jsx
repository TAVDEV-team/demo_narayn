import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa"; // For loading spinner

export default function GoverningBody() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/user/governing/")
      .then((res) => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching governing body:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-sky-50 py-12 min-h-screen mt-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-blue-900 mb-10"
      >
        Governing Body
      </motion.h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <FaSpinner className="animate-spin text-blue-600 text-4xl mb-4" />
          <p className="text-blue-700 font-medium text-lg">Loading members...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-red-600 font-medium text-lg">
            Failed to load governing body members.
          </p>
        </div>
      ) : members.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No members found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-20">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
            >
              <img
                src={member.account?.image || "https://via.placeholder.com/150"}
                alt={member.account?.user?.first_name}
                className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-200"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {member.account?.user?.first_name} {member.account?.user?.last_name}
              </h2>
              <p className="text-blue-700 font-semibold capitalize">{member.designation}</p>
              <p className="text-gray-600 text-sm mt-1">{member.profession}</p>

              <div className="mt-4 text-gray-500 text-sm">
                <p>{member.account?.user?.email}</p>
                <p>{member.account?.mobile}</p>
                <p>{member.account?.address}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
