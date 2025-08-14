import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ApprovedNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/nphs/notices/approved/")
      .then((res) => {
        setNotices(res.data);
      })
      .catch((err) => {
        console.error("Error fetching notices:", err);
      });
  }, []);

  return (
    <section className="bg-sky-50 py-10 px-6 md:px-20">
      
      <div className="mb-6 text-center mt-20">
        <h1 className="text-3xl font-extrabold text-blue-900">
          নোটিশ বোর্ড
        </h1>
        <p className="text-gray-600 text-lg mt-1">
          বিদ্যালয়ের অনুমোদিত সকল বিজ্ঞপ্তি এখানে প্রকাশিত হয়
        </p>
      </div>

  
      <div className="space-y-4">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice.slug}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {notice.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Date:{" "}
                  {new Date(notice.notice_for_date).toLocaleDateString("bn-BD", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
             <Link
  to={`/notices/${notice.id}`}
  className="text-blue-600 font-medium hover:underline"
>
  See More →
</Link>

            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">
            বর্তমানে কোন অনুমোদিত নোটিশ নেই
          </p>
        )}
      </div>
    </section>
  );
}
