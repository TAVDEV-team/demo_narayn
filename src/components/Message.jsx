import React from "react";

export default function Message({ title, message, signName, signRole, sideImages }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      {/* Left side - Message */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold text-sky-900 mb-4">{title}</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{message}</p>
        <p className="font-semibold text-sky-800">{signName}</p>
        <p className="text-gray-600">{signRole}</p>
      </div>

      {/* Right side - Images */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center space-x-4">
          {sideImages.map((img, idx) => (
            <div key={idx} className="text-center">
              <img
                src={img.src}
                alt={img.name}
                className="w-52 h-60 object-cover border rounded-md shadow-md mx-auto"
              />
              <p className="mt-2 text-sm font-medium text-gray-800">{img.name}</p>
              <p className="text-xs text-gray-500">{img.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
