import React from "react";
import { Link } from "react-router-dom";
import {BookOpen, GraduationCap, PenTool, NotebookText, Scroll } from "lucide-react"; // fancy icons

const classes = [
  {
    grade: 6,
    title: "Class 6",
    description: "Syllabus, routine, notices",
    icon: <BookOpen  size={48} className="text-indigo-600" />,
  },
  {
    grade: 7,
    title: "Class 7",
    description: "Syllabus, routine, notices",
    icon: <NotebookText size={48} className="text-green-600" />,
  },
  {
    grade: 8,
    title: "Class 8",
    description: "Syllabus, routine, notices",
    icon: <PenTool size={48} className="text-pink-600" />,
  },
  
  {
    grade: 9,
    title: "Class 9",
    description: "Syllabus, routine, notices",
    icon: <Scroll size={48} className="text-yellow-600" />,
  },
  
  {
    grade: 10,
    title: "Class 10",
    description: "Syllabus, routine, notices",
    icon: <GraduationCap size={48} className="text-purple-600" />,
  },
];

export default function StudentPortal() {
  return (
  <div 
  className="relative h-screen w-screen bg-cover bg-center mt-16"
  style={{ backgroundImage: "url('/back.avif')" }}
>

  

      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          🎓 Student Portal
        </h1>
        <p className="text-lg text-gray-700 font-semibold relative inline-block after:content-[''] after:block after:w-12 after:h-[2px] after:bg-indigo-500 after:mt-1 after:mx-auto">
  Select your class
</p>

      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 hover:shadow-sm ">
        {classes.map((cls) => (
          <Link
            key={cls.grade}
            to={`/class/${cls.grade}`}
            className="aspect-square rounded-2xl shadow-md border border-gray-300 flex flex-col items-center justify-center p-6
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-slate-200"
            aria-label={`Open Class ${cls.grade} dashboard`}
          >
            <div className="mb-4">{cls.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800">{cls.title}</h2>
            {/* <p className="text-sm text-gray-500 mt-1">{cls.description}</p> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
