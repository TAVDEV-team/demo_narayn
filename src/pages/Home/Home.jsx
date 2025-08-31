import React from "react";
import Hero from "./Hero";
import Message from "../../components/Message";
import History from "../../components/History";
import PhotoGallery from "../../components/PhotoGallery";
import WelcomeMessage from "../../components/WelcomeMessage";

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
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <WelcomeMessage />
        <Message />
        {/* <History /> */}
        <PhotoGallery images={galleryImages} />
      </div>
    </div>
  );
}
