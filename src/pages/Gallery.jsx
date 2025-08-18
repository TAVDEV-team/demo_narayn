// src/pages/Gallery.jsx
import React from "react";
import { motion } from "framer-motion";

// Import your images from assets (example)
const images = [
  "/building1.jpg",
  "/building1.jpg",
  "/building1.jpg",
  "/building1.jpg",
  "/building1.jpg",
  "/building1.jpg",
];


// const images = [img1, img2, img3, img4, img5, img6];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-sky-900 mb-12"
        >
          📸 Our School Gallery
        </motion.h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">View Photo</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
