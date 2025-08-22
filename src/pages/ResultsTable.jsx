import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ClassResult() {
  const { examId, classId } = useParams(); // coming from URL
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://narayanpur-high-school.onrender.com/api/result/class_result/${examId}/${classId}/`
      )
      .then((res) => {
        setResults(res.data.student_results || []); // ✅ array
        setSummary({
          total_students: res.data.total_students,
          total_marks: res.data.total_marks,
          overall_percentage: res.data.overall_percentage,
          passed: res.data.passed,
          failed: res.data.failed,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [examId, classId]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-12">
      {/* --- Summary Section --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h4 className="text-sm text-gray-600">Total Students</h4>
          <p className="text-xl font-bold">{summary.total_students}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h4 className="text-sm text-gray-600">Passed</h4>
          <p className="text-xl font-bold">{summary.passed}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h4 className="text-sm text-gray-600">Failed</h4>
          <p className="text-xl font-bold">{summary.failed}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h4 className="text-sm text-gray-600">Overall %</h4>
          <p className="text-xl font-bold">{summary.overall_percentage}%</p>
        </div>
      </div>

      {/* --- Results Table --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Roll</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Obtained</th>
              <th className="border px-4 py-2">Percentage</th>
              <th className="border px-4 py-2">Rank</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Certificate</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, i) => (
              
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{res.roll}</td>
                <td className="border px-4 py-2">{res.name || "N/A"}</td>
              <td className="border px-4 py-2 text-center">{res.obtained}</td>
                <td className="border px-4 py-2 text-center">
                  {res.percentage}%
                </td>
                <td className="border px-4 py-2 text-center">{res.rank}</td>
                <td
                  className={`border px-4 py-2 text-center font-semibold ${
                    res.status === "PASSED"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {res.status}
                 
                </td>
               <td className="border px-4 py-2 text-center">
  <a
    href={`https://narayanpur-high-school.onrender.com/api/result/card_pdf/${examId}/${res.id}/`}
    rel="noopener noreferrer"
    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
  >
    Download
  </a>
</td>



              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
