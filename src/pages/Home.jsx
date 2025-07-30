import React from "react";
import schoolImg from "/sir.jpg";
import GoverningBody from "../components/GoverningBody";
import NoticeBoard from "../components/NoticeBoard";

export default function Home() {
  return (
    <div className="px-6 py-10 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Text content */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Narayanpur High School
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Narayanpur High School is a boys & girls educational institute in Narayanpur, Chauddagram, Cumilla. It has 1 campus and around 25,000 students. Narayanpur High School is one of the renowned educational institutes in Bangladesh. We consider every child as unique and so we maintain inclusive learning-teaching environment at every step in our great set-up. Our results are getting better in public exams due to our extensive individual care.
          </p>
          <p className="text-lg font-bold text-gray-800">
            — Shapon Chakraborty<br />
            Headteacher, Narayanpur High School
          </p>
        </div>

        {/* Right: Image */}
        <div>
          <img
            src={schoolImg}
            alt="Narayanpur High School"
            className="rounded-lg shadow-lg w-full max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Governing Body Section */}
      <div className="mt-16">
        <GoverningBody />
      </div>

      {/* Notice Board Section */}
      <div className="mt-10">
        <NoticeBoard />
      </div>
    </div>
  );
}
