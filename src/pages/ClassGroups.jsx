import React from "react";
import { Link, useParams } from "react-router-dom";
import { FlaskConical, Calculator, Book } from "lucide-react";

const groups = [
  { id: "science", title: "Science", icon: <FlaskConical size={60} className="text-blue-600" /> },
  { id: "commerce", title: "Business Studies", icon: <Calculator size={60} className="text-green-600" /> },
  { id: "arts", title: "Humanity", icon: <Book size={60} className="text-pink-600" /> },
];

export default function ClassGroups() {
  const { grade } = useParams(); 

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center pt-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/b2.jpeg')" }}
    >
      {/* Header */}
    <div className="max-w-6xl mx-auto text-center mb-12">
  <h1 className="w-full text-2xl sm:text-3xl md:text-4xl font-bold text-white bg-sky-950 mb-4 rounded-xl py-3 px-4 sm:px-6 shadow-md mt-5">
    📚 Class {grade} - Select Your Group
  </h1>
  <p className="inline-block mt-2 text-lg sm:text-xl md:text-2xl text-white bg-sky-900 rounded-lg py-2 px-20 shadow-md">
    Choose Your Study Stream
  </p>
</div>



      {/* Groups Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/class/${grade}/${group.id}`}
            className="aspect-square rounded-2xl shadow-md border border-gray-300 flex flex-col items-center justify-center p-4 sm:p-6
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-slate-200"
          >
            <div className="mb-4">{group.icon}</div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
              {group.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
