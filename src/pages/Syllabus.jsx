import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { section } from "framer-motion/client";

export default function Syllabus() {
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
    <section className="bg-sky-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 mt-10 min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white bg-blue-950 mb-12 py-2 px-6 sm:px-10 w-fit mx-auto rounded-full">
        Syllabus
      </h1>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
        <table className="min-w-full table-auto text-sm sm:text-base">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Uploaded</th>
              <th className="px-4 py-3 text-center">View</th>
              <th className="px-4 py-3 text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {syllabusList.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3">{item.class_title || "-"}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(item.uploaded_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 gap-2 text-center">
                  {item.file ? (
                    <>
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                      >
                        View
                      </a>
                    </>
                  ) : (
                    <span className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg">
                      Not Available
                    </span>
                  )}
                </td>
                <td className="px-4 py-3  gap-2 text-center">
                                    {item.file ? (
                    <>
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
                        className="px-3 py-1.5 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors  mx-auto"
                      >
                        Download
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg">
                      Not Available
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </section>
  );
}
