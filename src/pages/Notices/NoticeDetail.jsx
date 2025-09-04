import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "../../api/api";
import { Loader2 } from "lucide-react";
import Loading from "../../components/Loading";

export default function NoticeDetail() {
  const { id } = useParams();
  const location = useLocation(); 
  const fromPage = location.state?.from || "approved";

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API
      .get(`/nphs/notices/${id}/`)
      .then((res) => setNotice(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    <Loading/>
    ;

  if (!notice) return <p className="p-6 text-center">Notice not found.</p>;

  const formattedDate = new Date(notice.notice_for_date).toLocaleDateString({
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto bg-sky-50 shadow-2xl rounded-lg border border-green-200 p-10 relative min-h-[900px] mt-20">
      {/* Watermark Logo */}
      <img
        src="/logo.png"
        alt="Watermark Logo"
        className="absolute inset-0 m-auto opacity-10 w-full h-full object-contain pointer-events-none"
      />

      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-green-800 mb-2 tracking-wide uppercase relative z-10">
        Narayanpur High School
        <p className="text-sm text-gray-700 leading-snug">AmjadNagar, Chauddagram, Cumilla 3500</p>
      </h1>
      <div className="w-24 h-1 bg-green-500 mx-auto mb-8 relative z-10"></div>

      {/* Date */}
      <p className="text-gray-600 text-lg text-right mb-8 italic relative z-10">{formattedDate}</p>

      {/* Notice Title */}
      <h2 className="text-2xl font-semibold text-center mb-6 relative z-10">{notice.title}</h2>

      {/* Notice Body */}
      <div className="text-lg text-gray-800 leading-relaxed space-y-4 break-words whitespace-pre-line relative z-10">
        {notice.description.split("\n").map((para, idx) => (
          <p key={idx}>{para.trim()}</p>
        ))}
      </div>

      {/* Footer Line */}
      {fromPage === "approved" && notice.approved_by_headmaster && (
  <div className=" mt-96 pt-32 relative z-10">
    <p className="text-right font-semibold text-green-700 text-lg">
      Approved by headmaster
    </p>
  </div>
)}


      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-400 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-400 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-400 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-400 rounded-br-lg"></div>
    </div>
  );
}
