import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    axios
      .get(`https://narayanpur-high-school.onrender.com/api/nphs/notices/${id}/`)
      .then(res => setNotice(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!notice) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{notice.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        {new Date(notice.notice_for_date).toLocaleDateString("bn-BD", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="text-lg text-gray-700 whitespace-pre-line">
        {notice.description}
      </p>
    </div>
  );
}
