import React, { useEffect, useState } from "react";
import axios from "axios";
import { Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoticeTicker() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/nphs/notices/approved/")
      .then((res) => setNotices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="flex justify-end px-4 sm:px-10 my-10">
      {/* Notice Box */}
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden border border-blue-950">
        {/* Heading */}
        <div className="bg-blue-950 text-white py-3 px-4 text-lg font-semibold flex items-center">
          <Volume2 className="w-6 h-6 mr-2" />
          Notices
        </div>

        {/* Scrolling Notices */}
        <div className="relative h-72 overflow-hidden p-2">
          <div className="absolute animate-scroll space-y-4 w-full">
            {notices.length > 0 ? (
              notices.map((notice) => {
                const noticeDate = new Date(notice.notice_for_date);
                const day = noticeDate.getDate();
                const month = noticeDate.toLocaleString("en-US", { month: "short" });

                return (
                  <div
                    key={notice.id}
                    className="flex justify-between items-center bg-blue-50 border border-blue-200 rounded-md p-2 hover:bg-blue-100 transition cursor-pointer"
                  >
                    {/* Left side - Day & Month */}
                    <div className="flex flex-col items-center justify-center px-2 py-1">
                      <div className="bg-blue-950 text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded">
                        {day}
                      </div>
                      <div className="bg-gray-600 text-white font-semibold text-sm w-10 h-6 flex items-center justify-center rounded mt-1">
                        {month}
                      </div>
                    </div>

                    {/* Right side - Title & Find More */}
                    <div className="flex-1 ml-3">
                      <p className="text-blue-950 font-medium text-sm sm:text-base truncate">
                        {notice.title}
                      </p>
                      <Link
                        to={`/notices/${notice.id}`}
                        className="text-blue-950 font-semibold text-xs sm:text-sm hover:underline"
                      >
                        Find More →
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-blue-950 font-medium text-center">
                No notices available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            top: 100%;
          }
          100% {
            top: -100%;
          }
        }
        .animate-scroll {
          position: absolute;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
