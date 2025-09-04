import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { motion } from "framer-motion";
import { FaSpinner, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Loading from "../../components/Loading";
import ListHeaders from "../../components/Titles/ListHeaders";


export default function GoverningBody() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    API
      .get("/user/governing/")
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
      {/* <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center w-96 mx-auto rounded-full text-white bg-blue-950 mb-12 py-2"
      >
        Governing Body
      </motion.h1> */}
    <ListHeaders
    text={"Governing Body"}
    />
      {loading ? (
        <Loading/>
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
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 md:px-20">
  {members.map((member, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-white to-slate-200 shadow-md rounded-2xl p-6  flex flex-col md:flex-row items-center md:items-start gap-6 transform hover:scale-105 hover:shadow-xl transition duration-300"
    >
      {/* Profile Image */}
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={member.account?.image || "https://via.placeholder.com/150"}
          alt={member.account?.user?.first_name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-sm"
        />
      </div>

      {/* Member Info */}
      <div className="flex flex-col text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800">
          {member.account?.user?.first_name} {member.account?.user?.last_name}
        </h2>
        <p className="text-gray-700 font-semibold capitalize mt-1">{member.designation}</p>
        <p className="text-gray-600 text-sm mt-1">{member.profession}</p>

        <div className="mt-4 text-gray-500 text-sm space-y-1">
          {member.account?.user?.email && (
            <p className="flex items-center gap-2">
              <FaEnvelope  /> {member.account.user.email}
            </p>
          )}
          {member.account?.mobile && (
            <p className="flex items-center gap-2">
              <FaPhone  /> {member.account.mobile}
            </p>
          )}
          {member.account?.address && (
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt  /> {member.account.address}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  ))}
</div>
 
      )}
    </section>



  );
}
