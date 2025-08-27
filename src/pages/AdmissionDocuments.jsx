// src/pages/AdmissionDocuments.jsx
import React from "react";

export default function AdmissionDocuments() {
  const documents = [
    "Birth Certificate – Photocopy of the student’s birth registration.",
    "Transfer Certificate – From the previous school (if transferring).",
    "Report Card / Progress Report – Last academic year’s result sheet.",
    "Student’s Photographs – 2 recent passport-size color photographs.",
    "Parent/Guardian’s National ID – Photocopy for verification.",
    "Medical Fitness Certificate – From a registered doctor (if required).",
    "Proof of Address – Utility bill copy / rent agreement (if applicable).",
  ];

  return (
    <section className="bg-gray-50 py-10 sm:py-16 px-4 sm:px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
        
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          📄 Documents Required for Admission
        </h1>
        <p className="text-gray-600 text-center mb-8 font-medium sm:font-semibold text-sm sm:text-base md:text-lg">
          To complete the admission process at <strong>Narayanpur High School</strong>,
          please bring the following documents when submitting the admission form.
        </p>

        {/* Documents List */}
        <ul className="space-y-4 font-semibold">
          {documents.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 border-b pb-3"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold mb-1 sm:mb-0">
                {index + 1}
              </span>
              <p className="text-gray-700 text-sm sm:text-base">{item}</p>
            </li>
          ))}
        </ul>

        {/* Submission Details */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
            🕒 Submission Details
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
            <li>
              <strong>Where to Submit:</strong> School Office (Administration Desk)
            </li>
            <li>
              <strong>Office Hours:</strong> Sunday – Thursday, 8:00 AM – 4:00 PM
            </li>
            <li>
              <strong>Contact:</strong> +8801819823733 | sn105409@gmail.com
            </li>
          </ul>
        </div>

        {/* Important Notes */}
        <div className="mt-10 bg-yellow-50 p-4 sm:p-5 rounded-lg border-l-4 border-yellow-400">
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-800 mb-2">
            ⚠ Important Notes
          </h2>
          <ul className="list-disc list-inside text-yellow-700 space-y-1 text-sm sm:text-base">
            <li>All documents must be submitted in a clear and legible format.</li>
            <li>Incomplete applications will not be accepted.</li>
            <li>Keep a photocopy of all submitted documents for your own record.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
