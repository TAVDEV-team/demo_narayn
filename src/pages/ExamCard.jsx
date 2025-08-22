import React from "react";
import { Link } from "react-router-dom";
import { ClipboardList, FileText, Award } from "lucide-react";

const exams = [
  { id: 1, title: "Test Exam", icon: <ClipboardList size={48} className="text-blue-600" /> },
  { id: 2, title: "Half-Yearly Exam", icon: <FileText size={48} className="text-green-600" /> },
  { id: 3, title: "Final Exam", icon: <Award size={48} className="text-purple-600" /> },
];

export default function ExamCard() {
  return (
    <section className="bg-sky-50 pb-10">
    <div className="max-w-5xl mx-auto py-10 px-6 b">
      <h1 className="text-2xl font-bold text-center mb-8 mt-10 bg-blue-950 text-white rounded-2xl py-4">📑 Select Exam</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Link
            key={exam.id}
            to={`/results/${exam.id}`}
            className="aspect-square rounded-3xl shadow-lg border border-gray-300 flex flex-col items-center justify-center p-5 sm:p-6
               hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
               bg-gradient-to-br from-white to-slate-300"
          >
            <div className="mb-4">{exam.icon}</div>
            <h2 className="text-lg font-semibold">{exam.title}</h2>
          </Link>
        ))}
      </div>
    </div>
    </section>
  );
}
