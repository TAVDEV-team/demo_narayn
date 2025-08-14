
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

  const formattedDate = new Date(notice.notice_for_date).toLocaleDateString("bn-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-br from-green-100 to-white min-h-screen py-10 px-4 mt-16">
      <div className="max-w-4xl mx-auto bg-sky-50 shadow-2xl rounded-lg border border-green-200 p-10 relative">
        {/* Watermark Logo */}
       <img
        src="/logo.png"
        alt="Watermark Logo"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 h-72 w-auto pointer-events-none"
      />
        {/* School Logo at top center */}
        {/* <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="School Logo" className="h-20" />
        </div> */}

        {/* Decorative heading */}
        <h1 className="text-3xl font-bold text-center text-green-800 mb-2 tracking-wide uppercase">
          Narayanpur High School
          <p className="text-sm text-gray-700 leading-snug">AmjadNagar, Chauddagram, Cumilla 3500</p>
        </h1>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>

        {/* Date */}
        <p className="text-gray-600 text-lg text-right mb-8 italic">{formattedDate}</p>

        {/* Notice Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">{notice.title}</h2>

        {/* Notice Body - Paragraphs */}
        <div className="text-lg text-gray-800 leading-relaxed space-y-4 break-words whitespace-pre-line">
          {notice.description.split("\n").map((para, idx) => (
            <p key={idx}>{para.trim()}</p>
          ))}
        </div>

        {/* Footer Line */}
        {notice.is_approved && (
  <div className="border-t border-green-300 mt-16 pt-6">
    <p className="text-right font-semibold text-green-700 text-lg">
      অনুমোদিত প্রধান শিক্ষক
    </p>
  </div>
)}


        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-400 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-400 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-400 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-400 rounded-br-lg"></div>
      </div>
    </div>
  );
}




