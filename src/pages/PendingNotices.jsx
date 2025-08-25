import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function PendingNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPendingNotices = () => {
    setLoading(true);
    axios
      .get("https://narayanpur-high-school.onrender.com/api/nphs/notices/pending/")
      .then((res) => setNotices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPendingNotices();
  }, []);

  const approveNotice = async (id) => {
    try {
      await axios.get(`https://narayanpur-high-school.onrender.com/api/nphs/notices/${id}/approve/`);
      setNotices(prev => prev.filter(n => n.id !== id));
      setMessage("Notice approved successfully ✅");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Approval failed:", err);
      setMessage("Approval failed ❌");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <section className="py-4 px-4 sm:px-8 md:px-16 lg:px-24 bg-sky-50 min-h-screen">
      {/* Header */}
      <div className="mb-10 text-center mt-16 bg-blue-950 text-white py-6 sm:py-4 md:py-5 rounded-3xl shadow-xl max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-lg">
          Pending Notices Review
        </h1>
        <p className="text-base sm:text-lg md:text-lg mt-2 sm:mt-3 opacity-90 font-medium">
          please approve the pending notices.
        </p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className="p-3 my-4 rounded bg-green-100 text-green-800 text-center text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          {message}
        </div>
      )}

      {/* Notices Section */}
      {loading ? (
        <div className="flex justify-center items-center space-x-2 text-blue-950 py-10">
          <Loader2 className="animate-spin w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
          <span className="font-semibold text-base sm:text-lg md:text-xl">Loading...</span>
        </div>
      ) : notices.length > 0 ? (
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="border bg-slate-100 border-blue-950 rounded-2xl shadow-md hover:shadow-xl transition p-4 sm:p-5 md:p-6 max-w-full sm:max-w-3xl mx-auto flex flex-col justify-between"
            >
              {/* Notice Header */}
              <div className="flex justify-between items-start border-b border-blue-950 pb-1 mb-2">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-950 truncate">
                  {notice.title}
                </h3>
                <span className="text-xs sm:text-sm md:text-base text-blue-950 opacity-70 whitespace-nowrap">
                  {new Date(notice.notice_for_date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-blue-950 opacity-80 line-clamp-1 mb-3">
                {notice.description}....
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto">
                <Link
                  to={`/notices/${notice.id}`}
                  state={{ from: "pending" }}
                  className="w-full sm:w-auto text-center bg-blue-950 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition text-sm sm:text-base md:text-lg"
                >
                  Details →
                </Link>
                <button
                  onClick={() => approveNotice(notice.id)}
                  className="w-full sm:w-auto text-center bg-blue-950 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition text-sm sm:text-base md:text-lg"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-blue-950 text-center font-medium text-lg sm:text-xl md:text-2xl py-10">
          No pending notices at the moment. All caught up!
        </p>
      )}
    </section>
  );
}
