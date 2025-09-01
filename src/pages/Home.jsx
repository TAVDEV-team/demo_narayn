// import React from "react";
// import Hero from "../components/Hero";
// import Message from "../components/Message";
// import History from "../components/History";
// import PhotoGallery from "../components/PhotoGallery";
// import WelcomeMessage from "../components/WelcomeMessage";

// const galleryImages = [
//   "/buildin2.jpg",
//   "/buiding3.jpg",
//   "/function.jpg",
//   "/school1.jpg",
//   "/buikding1.jpg",
//   "/school.jpg",
//   "/school2.jpg",
//   "/school.jpg",
// ];

// export default function Home() {
//   return (
//     <div className="w-full overflow-x-hidden">
//       <Hero />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
//         <WelcomeMessage />
//         <Message />
//         {/* <History /> */}
//         <PhotoGallery images={galleryImages} />
//       </div>
//     </div>
//   );
// }


import { BookOpen, Calendar, Users, Images, PhoneCall } from "lucide-react";
import React from "react";
import Hero from "../components/Hero";
import Message from "../components/Message";
import PhotoGallery from "../components/PhotoGallery";
import WelcomeMessage from "../components/WelcomeMessage";
import LatestNotices from "../components/LatestNotices";
import ClickToPlayVideo from "../components/ClickToPlayVideo";


const galleryImages = [
  "/buildin2.jpg",
  "/buiding3.jpg",
  "/function.jpg",
  "/school1.jpg",
  "/buikding1.jpg",
  "/school.jpg",
  "/school2.jpg",
  "/school.jpg",
];

export default function Home() {
  const features = [
    // {
    //   title: "Admission Info",
    //   desc: "Find details about admission process, requirements, and important dates.",
    //   icon: <BookOpen className="w-10 h-10 text-blue-600" />,
    //   link: "/admission",
    //   color: "bg-blue-100",
    // },
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
    // {
    //   title: "Gallery",
    //   desc: "View memorable moments from our school events, sports, and cultural activities.",
    //   icon: <Images className="w-10 h-10 text-pink-600" />,
    //   link: "/gallery",
    //   color: "bg-pink-100",
    // },
    {
      title: "Contact Us",
      desc: "Reach out for inquiries, feedback, or support via phone or email.",
      icon: <PhoneCall className="w-10 h-10 text-purple-600" />,
      link: "/contact",
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="bg-sky-100 min-h-screen">
     
       <div className="w-full overflow-x-hidden">
         <Hero />
        </div>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
       <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mb-12 tracking-tight">
  Explore Our School
</h2>

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
      <LatestNotices />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
         <Message />
        <WelcomeMessage />
        </div>
      <PhotoGallery images={galleryImages} />
      <ClickToPlayVideo />

    </div>
    
  );
}

