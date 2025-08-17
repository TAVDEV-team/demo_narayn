// src/pages/ClassGroups.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { FlaskConical, Calculator, Book } from "lucide-react";

const groups = [
  {
    id: "science",
    title: "Science",
    icon: <FlaskConical size={80} className="text-blue-600" />,
  },
  {
    id: "commerce",
    title: "Buiesness Studies",
    icon: <Calculator size={80} className="text-green-600" />,
  },
  {
    id: "arts",
    title: "Humanity",
    icon: <Book size={80  } className="text-pink-600" />,
  },
];

export default function ClassGroups() {
  const { grade } = useParams(); 

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-4 mt-20">
       <div 
  className="relative h-screen w-screen bg-cover bg-center mt-16"
  style={{ backgroundImage: "url('/b2.jpeg')" }}
>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold  mb-3">
          📚 Class {grade} - Select Your Group
        </h1>
        <p className="text-lg text-gray-700 font-semibold relative inline-block after:content-[''] after:block after:w-12 after:h-[2px] after:bg-indigo-500 after:mt-1 after:mx-auto">
    Choose Your Study Sream
</p>

      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/class/${grade}/${group.id}`}
            className="aspect-square rounded-2xl shadow-md border border-gray-300 flex flex-col items-center justify-center p-6
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-slate-200"
          >
            <div className="mb-4">{group.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800">
              {group.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
