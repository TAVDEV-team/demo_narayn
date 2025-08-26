import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Syllabus() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null); // modal state

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
    <div className="container mx-auto px-4 py-10 mt-10 min-h-screen bg-sky-50">
      <h1 className="text-3xl font-bold text-center text-white bg-blue-950 mb-12 py-2 w-96 mx-auto rounded-full">
        Syllabus
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {syllabusList.map((item) => (
          <motion.div
            key={item.id}
            className="
              bg-gradient-to-br from-white to-gray-300 
              shadow-md hover:shadow-xl 
              rounded-2xl p-6 
              border border-gray-200 
              transition-transform duration-300 
              transform hover:-translate-y-1
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-500 font-medium">
              Class: <span className="text-gray-800">{item.class_title}</span>
            </p>
            <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
            <p className="text-gray-400 text-sm mt-1">
              Uploaded: {new Date(item.uploaded_at).toLocaleDateString()}
            </p>

            {/* Download button */}
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
                className="inline-block mt-4 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors"
              >
                Download
              </button>
            ) : (
              <span className="inline-block mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
                Not Available
              </span>
            )}

            {/* Show button */}
            <button
              onClick={() => setSelectedSyllabus(item)}
              className="inline-block mt-4 ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Show
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedSyllabus && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 w-96 relative"
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

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {selectedSyllabus.title}
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Class:</span>{" "}
              {selectedSyllabus.class_title}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Uploaded:{" "}
              {new Date(selectedSyllabus.uploaded_at).toLocaleDateString()}
            </p>

            {selectedSyllabus.file ? (
              <a
                href={selectedSyllabus.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
