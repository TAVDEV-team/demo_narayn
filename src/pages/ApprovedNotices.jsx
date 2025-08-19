import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function ApprovedNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/nphs/notices/approved/")
      .then((res) => setNotices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-5 px-4 sm:px-8 md:px-20 bg-white min-h-screen">
      {/* Digital Board Header */}
      <div className="mb-10 text-center mt-20 bg-blue-950 text-white py-5 sm:py-6 rounded-2xl md:rounded-3xl shadow-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg">
          📌 নোটিশ বোর্ড
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2 opacity-90 font-medium">
          বিদ্যালয়ের অনুমোদিত সকল বিজ্ঞপ্তি এখানে প্রকাশিত হয়
        </p>
      </div>

      {/* Notices Section */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center items-center space-x-2 text-blue-950">
            <Loader2 className="animate-spin w-6 h-6 sm:w-7 sm:h-7" />
            <span className="font-semibold text-sm sm:text-base md:text-lg">
              লোড হচ্ছে...
            </span>
          </div>
        ) : notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice.slug}
              className="w-full bg-slate-200 border border-blue-950 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition p-3 sm:p-4 flex flex-col justify-between"
            >
              {/* Notice Header */}
              <h3 className="text-base sm:text-lg font-semibold text-blue-950 border-b border-blue-950 pb-1 mb-2 truncate">
                {notice.title}
              </h3>

              {/* Notice Meta */}
              <p className="text-xs sm:text-sm text-blue-950 mb-2 opacity-80 truncate">
                তারিখ:{" "}
                {new Date(notice.notice_for_date).toLocaleDateString({
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {/* See More Button */}
              <div className="text-right mt-auto">
                <Link
                  to={`/notices/${notice.id}`}
                  className="inline-block bg-blue-950 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-105 transition"
                >
                  বিস্তারিত →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-blue-950 text-center font-medium text-base sm:text-lg">
            বর্তমানে কোন অনুমোদিত নোটিশ নেই
          </p>
        )}
      </div>
    </section>
  );
}
