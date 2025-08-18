import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GoverningBody() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          "https://narayanpur-high-school.onrender.com/api/user/governing-body/"
        );
        setMembers(res.data);
      } catch (err) {
        console.error("Error fetching governing body members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
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
          Loading governing body...
        </p>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-sky-50 py-10 px-4">
  <div className="max-w-6xl mx-auto space-y-10">
    {/* Heading */}
    <div className="w-full">
     <h1 className="text-3xl md:text-4xl font-bold text-white bg-blue-950 text-center py-8 rounded-md shadow-md">
    Governing Body
  </h1>
    </div>

    {/* Member cards */}
    {members.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">No members found.</p>
    ) : (
      <div className="space-y-6">
        {members.map((member) => (
          <div
            key={member.account.id}
            className="flex bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200"
          >
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={member.account.image || "/default-avatar.png"}
                alt={member.account.full_name || member.account.user.username}
                className="w-full h-full object-cover rounded-full border-4 border-indigo-200"
              />
            </div>

            <div className="flex-1 p-4 flex flex-col justify-center ml-6 space-y-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {member.account.full_name?.trim() || member.account.user.username}
              </h2>
              {member.designation && (
                <p className="text-gray-600">
                  <span className="font-semibold">Designation:</span> {member.designation}
                </p>
              )}
              {member.account.email && (
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {member.account.email}
                </p>
              )}
              {member.account.phone && (
                <p className="text-gray-600">
                  <span className="font-semibold">Phone:</span> {member.account.phone}
                </p>
              )}
              {member.account.gender && (
                <p className="text-gray-600">
                  <span className="font-semibold">Gender:</span> {member.account.gender}
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
