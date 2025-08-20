import React from "react";
import Hero from "../components/Hero";
import Message from "../components/Message";
import GoverningBody from "../components/GoverningBody";
import History from "../components/History";
import NoticeTicker from "../components/NoticeTicker";
import PhotoGallery from "../components/PhotoGallery";

const galleryImages = [
  "/buildin2.jpg",
  "/buiding3.jpg",
  "/function.jpg",
  "/school1.jpg",
  "/buikding1.jpg",
  '/school.jpg',
  "/school2.jpg",
  "/school.jpg"
];


export default function Home() {
  return (
    <>
      <Hero />

      
       <Message
  title="Narayanpur High School"
  message={` Narayanpur High School is an boys-girls educational institute in Narayanpur, Chauddagram, Cumilla. It has 1 campuses and around 500 students. Narayanpur High School is one of the renowned educational institutes in Chauddagram. We consider every child as unique and so we maintain inclusive learning-teaching environment at every step in our great set-up. It is a fact now that our results are getting better in the public examinations every time. It has been made possible through our extensive and effective care stretched out to every individual student. Our students conglomerate here from multifarious backgrounds; various strata of the society. They enter the threshold of our strong and fortified home of learning and come out bearing an all-round personality.`}
  signName="Shapon Kumer Chakrobory"
  signRole="Headmaster, Narayanpur High School"
  sideImages={[
    { src: "/sir.jpg", name: "Headmaster", role: "Headmaster, VNSC" },
    { src: "/chairman.jpg",  name: "Chairman",  role: "Chairman, VNSC" }
  ]}
/>
      <NoticeTicker />  

        <GoverningBody />
        <History />
         <PhotoGallery images={galleryImages} />
      
    </>
  );
}
