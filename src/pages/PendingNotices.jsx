import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function PendingNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/nphs/notices/")
      .then((res) =>
        setNotices(res.data.filter((n) => !n.approved_by_headmaster))
      )
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const approveNotice = (id) => {
    axios
      .patch(
        `https://narayanpur-high-school.onrender.com/api/nphs/notices/${id}/`,
        { approved_by_headmaster: true }
      )
      .then(() => {
        setNotices(notices.filter((n) => n.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="py-5 px-6 md:px-20 bg-white min-h-screen">
      {/* Digital Board Header */}
      <div className="mb-10 text-center mt-20 bg-blue-950 text-white py-6 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Pending Notices Review
        </h1>
        <p className="text-lg mt-2 opacity-90 font-medium">
          Welcome, respected Headmaster. Please review and approve the pending
          notices.
        </p>
      </div>

      {/* Notices Section */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center space-x-2 text-blue-950">
            <Loader2 className="animate-spin w-7 h-7" />
            <span className="font-semibold text-lg">loading...</span>
          </div>
        ) : notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white border border-blue-950 rounded-2xl shadow-md hover:shadow-xl 
                         transition p-5 max-w-3xl mx-auto"
            >
              {/* Notice Header */}
              <h3 className="text-xl font-bold text-blue-950 border-b border-blue-950 pb-2 mb-2">
                {notice.title}
              </h3>

              {/* Notice Meta */}
              <p className="text-sm text-blue-950 mb-3 opacity-80">
                তারিখ:{" "}
                {new Date(notice.notice_for_date).toLocaleDateString("bn-BD", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <Link
                  to={`/notices/${notice.id}`}
                  className="inline-block bg-blue-950 text-white px-4 py-2 rounded-xl 
                             font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                >
                  বিস্তারিত দেখুন →
                </Link>

                <button
                  onClick={() => approveNotice(notice.id)}
                  className="inline-block bg-blue-950 text-white px-4 py-2 rounded-xl 
                             font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                >
                  ✅ Approve
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-blue-950 text-center font-medium text-2xl">
            No pending notices at the moment. All caught up!
          </p>
        )}
      </div>
    </section>
  );
}
