import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Syllabus() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);

  useEffect(() => {
    axios
      .get("https://narayanpur-high-school.onrender.com/api/nphs/syllabus/")
      .then((res) => {
        setSyllabusList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load syllabus.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading syllabus...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 mt-10 min-h-screen bg-sky-50">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white bg-blue-950 mb-12 py-2 px-6 sm:px-10 w-fit mx-auto rounded-full">
        Syllabus
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {syllabusList.map((item) => (
          <motion.div
            key={item.id}
            className="
              bg-gradient-to-br from-white to-gray-300 
              shadow-md hover:shadow-xl 
              rounded-2xl p-4 sm:p-6 
              border border-gray-200 
              transition-transform duration-300 
              transform hover:-translate-y-1
              flex flex-col justify-between
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p className="text-gray-500 font-medium text-sm sm:text-base">
                Class: <span className="text-gray-800">{item.class_title}</span>
              </p>
              <h2 className="text-lg sm:text-xl font-semibold mt-2 line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Uploaded: {new Date(item.uploaded_at).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-4">
              {item.file ? (
                <button
                  onClick={async () => {
                    try {
                      const response = await axios.get(
                        `https://narayanpur-high-school.onrender.com/api/nphs/syllabus/${item.id}/download/`,
                        { responseType: "blob" }
                      );
                      const url = window.URL.createObjectURL(
                        new Blob([response.data])
                      );
                      const link = document.createElement("a");
                      link.href = url;
                      const filename =
                        item.file.split("/").pop() || "syllabus.pdf";
                      link.setAttribute("download", filename);
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                    } catch (err) {
                      console.error("Download failed:", err);
                      alert("Failed to download file.");
                    }
                  }}
                  className="flex-1 min-w-[100px] px-3 py-2 sm:px-4 sm:py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 text-sm sm:text-base transition-colors"
                >
                  Download
                </button>
              ) : (
                <span className="flex-1 min-w-[100px] text-center px-3 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm sm:text-base">
                  Not Available
                </span>
              )}

              <button
                onClick={() => setSelectedSyllabus(item)}
                className="flex-1 min-w-[100px] px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base transition-colors"
              >
                Show
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedSyllabus && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4 overflow-auto">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
              onClick={() => setSelectedSyllabus(null)}
            >
              ✕
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 break-words">
              {selectedSyllabus.title}
            </h2>
            <p className="text-gray-700 mb-2 text-sm sm:text-base">
              <span className="font-medium">Class:</span>{" "}
              {selectedSyllabus.class_title}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mb-4">
              Uploaded: {new Date(selectedSyllabus.uploaded_at).toLocaleDateString()}
            </p>

            {selectedSyllabus.file ? (
              <a
                href={selectedSyllabus.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base transition-colors"
              >
                View File
              </a>
            ) : (
              <p className="text-gray-500">No file available.</p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
