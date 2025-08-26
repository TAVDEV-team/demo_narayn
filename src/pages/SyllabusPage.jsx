import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function SyllabusPage() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container mx-auto px-4 py-10 mt-10 min-h-screen bg-sky-50 ">
      <h1 className="text-3xl font-bold  text-center text-white bg-blue-950 mb-12 py-2 w-96 mx-auto rounded-full">
        Syllabus
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
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
           {item.file ? (
  <button
    onClick={async () => {
      try {
        const response = await axios.get(
          `https://narayanpur-high-school.onrender.com/api/nphs/syllabus/${item.id}/download/`,
          { responseType: "blob" } // important to get file as blob
        );

        // Create a URL for the file blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // Use the original filename or fallback
        const filename = item.file.split("/").pop() || "syllabus.pdf";
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

          </motion.div>
        ))}
      </div>
    </div>
  );
}
