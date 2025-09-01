
import { Link, useParams } from "react-router-dom";
import { FlaskConical, Calculator, Book } from "lucide-react";

const groups = [
  { 
    id: "science", 
    title: "Science", 
    icon: <FlaskConical size={60} className="text-blue-600" />, 
    stats: { total: 120, male: 70, female: 50 } 
  },
  { 
    id: "commerce", 
    title: "Business Studies", 
    icon: <Calculator size={60} className="text-green-600" />, 
    stats: { total: 90, male: 40, female: 50 } 
  },
  { 
    id: "arts", 
    title: "Humanity", 
    icon: <Book size={60} className="text-pink-600" />, 
    stats: { total: 150, male: 60, female: 90 } 
  },
];


export default function ClassGroups() {
  const { grade } = useParams(); 

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-sky-50 bg-center pt-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/b.jpg')" }}
    >
      {/* Header */}
    <div className="max-w-6xl mx-auto text-center mb-12">
  <h1 className="w-full text-2xl sm:text-3xl md:text-4xl font-bold mt-10 text-white bg-blue-950 mb-4 rounded-xl py-3 px-4 sm:px-6 shadow-md">
    📚 Class {grade} - Select Your Group
  </h1>
  {/* <p className="inline-block mt-2 text-lg sm:text-xl md:text-2xl text-white bg-sky-900 rounded-lg py-2 px-20 shadow-md">
    Choose Your Study Stream
  </p> */}
</div>



      {/* Groups Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-slate-100">
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/class/${grade}/${group.id}`}
            className="aspect-square rounded-3xl shadow-lg border border-gray-300 flex flex-col items-center justify-center p-5 sm:p-6
               hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
               bg-gradient-to-br from-white to-slate-300"
          >
            <div className="mb-4">{group.icon}</div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
              {group.title}
            </h2>
             <div className="flex flex-col space-y-1 text-center">
      <span className="text-sm font-medium ">
        Total Students: <span className="font-bold">{group.stats.total}</span>
      </span>
      <span className="text-sm font-medium ">
        Male: <span className="font-bold">{group.stats.total}</span>
      </span>
      <span className="text-sm font-medium ">
        Female: <span className="font-bold">{group.stats.total}</span>
      </span>
    </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
