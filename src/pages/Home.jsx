import React from "react";
import GoverningBody from "../components/GoverningBody";
import NoticeBoard from "../components/NoticeBoard";
import History from "../components/History";  // Import your new History component
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mt-20">
          <GoverningBody />
        </div>

        <div className="mt-16">
          <NoticeBoard />
        </div>

        {/* Add History here, with some margin on top */}
        <div className="mt-20">
          <History />
        </div>
      </div>
    </>
  );
}
