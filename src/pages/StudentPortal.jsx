import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, PenTool, NotebookText, Scroll } from "lucide-react"; // fancy icons

const classes = [
  { grade: 6, title: "Class 6", description: "Syllabus, routine, notices", icon: <BookOpen size={48} className="text-indigo-600" /> },
  { grade: 7, title: "Class 7", description: "Syllabus, routine, notices", icon: <NotebookText size={48} className="text-green-600" /> },
  { grade: 8, title: "Class 8", description: "Syllabus, routine, notices", icon: <PenTool size={48} className="text-pink-600" /> },
  { grade: 9, title: "Class 9", description: "Syllabus, routine, notices", icon: <Scroll size={48} className="text-yellow-600" /> },
  { grade: 10, title: "Class 10", description: "Syllabus, routine, notices", icon: <GraduationCap size={48} className="text-purple-600" /> },
];

export default function StudentPortal() {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center pt-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/back.avif')" }}
    >
      {/* Heading */}
     {/* Heading */}
<div className="max-w-6xl mx-auto text-center mb-10">
  <h1 className="w-full text-2xl sm:text-3xl md:text-4xl bg-sky-950 font-bold text-white mb-4 mt-5 rounded-xl py-3 px-4 sm:px-6 shadow-md">
    🎓 Student Portal
  </h1>
  <p className="inline-block mt-2 text-lg sm:text-xl md:text-2xl bg-sky-900 font-semibold text-white rounded-lg py-2 px-6 sm:px-32 shadow-md">
    Select your class
  </p>
</div>


      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {classes.map((cls) => (
          <Link
            key={cls.grade}
            to={`/class/${cls.grade}`}
            className="aspect-square rounded-2xl shadow-md border border-gray-300 flex flex-col items-center justify-center p-4 sm:p-6
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-slate-200"
            aria-label={`Open Class ${cls.grade} dashboard`}
          >
            <div className="mb-4">{cls.icon}</div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{cls.title}</h2>
            {/* <p className="text-sm text-gray-500 mt-1">{cls.description}</p> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
