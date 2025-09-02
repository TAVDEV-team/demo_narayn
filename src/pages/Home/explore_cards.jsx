import React from "react";
import { BookOpen, Calendar, Users, Images, PhoneCall } from "lucide-react";
import CardHeader from "./CardHeads";



export default function ExploreCards() {
      const features = [
    
    {
      title: "Class Routine",
      desc: "Check daily and weekly class routines for all grades and subjects.",
      icon: <Calendar className="w-10 h-10 text-green-600" />,
      link: "/routine",
      color: "bg-green-100",
    },
    {
      title: "Teachers",
      desc: "Meet our dedicated teachers who guide and inspire every student.",
      icon: <Users className="w-10 h-10 text-yellow-600" />,
      link: "/teacher",
      color: "bg-yellow-100",
    },

    {
      title: "Contact Us",
      desc: "Reach out for inquiries, feedback, or support via phone or email.",
      icon: <PhoneCall className="w-10 h-10 text-purple-600" />,
      link: "/contact",
      color: "bg-purple-100",
    },
  ];
  return (
      <section className="max-w-6xl mx-auto px-6 py-16">
    <CardHeader 
    text={"Explore Our School"}
    />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-black to-blue-950 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full ${item.color} mx-auto`}>
                {item.icon}
              </div>
              <h3 className="mt-4 text-white text-lg font-semibold text-center">{item.title}</h3>
              <p className="mt-2 text-white text-center text-sm">{item.desc}</p>
              <div className="text-center mt-4">
                <a
                  href={item.link}
                  className="text-white font-medium hover:underline"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}
