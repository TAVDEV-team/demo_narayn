import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PendingNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/nphs/notices/")
      .then((res) =>
        setNotices(res.data.filter((n) => !n.approved_by_headmaster))
      )
      .catch((err) => console.error(err));
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
    <section className="bg-sky-50 py-10 px-6 md:px-20 mt-20">
     
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-blue-900">
          Pending Notices Review
        </h1>
        <p className="text-gray-600 text-lg mt-1">
          Welcome, respected Headmaster. Please review and approve the pending notices.
        </p>
      </div>

      <div className="space-y-4">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice.id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition bg-indigo-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Date:{" "}
                    {new Date(notice.notice_for_date).toLocaleDateString(
                      "bn-BD",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => approveNotice(notice.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <Link
                    to={`/notices/${notice.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">
            No pending notices at the moment. All caught up!
          </p>
        )}
      </div>
    </section>
  );
}
