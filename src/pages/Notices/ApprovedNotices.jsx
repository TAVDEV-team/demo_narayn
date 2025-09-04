import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Loading from "../../components/Loading";
export default function ApprovedNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API
      .get("/nphs/notices/approved/")
      .then((res) => setNotices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-5 px-4 sm:px-8 md:px-20 bg-sky-50 min-h-screen">
      {/* Digital Board Header */}
      <div className="flex justify-center">
  <div className="mb-10 mt-20 bg-blue-950 text-white py-4 sm:py-4 rounded-2xl md:rounded-3xl shadow-xl max-w-4xl w-full text-center">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg">
      📌 Notice Board
    </h1>
    <p className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2 opacity-90 font-medium">
      All approved notices of the school are published here
    </p>
  </div>
</div>


      {/* Notices Section */}
      <div className="space-y-3">
        {loading ? (
          <Loading message="Notices"/>
        ) : notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice.slug}
              className="max-w-3xl mx-auto bg-slate-100 border border-blue-950 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition p-3 sm:p-2 flex flex-col justify-between"
            >
              {/* Notice Header */}
             
          <div className="flex justify-between items-start border-b border-blue-950 pb-1 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-blue-950 truncate">
              {notice.title}
            </h3>
            <span className="text-xs sm:text-sm text-blue-950 opacity-70 whitespace-nowrap">
              {new Date(notice.notice_for_date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

               <p className="text-xs sm:text-sm text-blue-950 opacity-80 line-clamp-1 mb-3">
                {notice.description}....
              </p>

              {/* See More Button */}
              <div className="text-right mt-auto">
               <Link
              to={`/notices/${notice.id}`}
              state={{ from: "approved" }}   // ✅ pass state
              className="inline-block bg-blue-950 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              Details →
            </Link>

              </div>
            </div>
          ))
        ) : (
          <p className="text-blue-950 text-center font-medium text-base sm:text-lg">
            Currently, there are no approved notices
          </p>
        )}
      </div>
    </section>
  );
}
