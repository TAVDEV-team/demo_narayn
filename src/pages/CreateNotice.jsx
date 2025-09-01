import React, { useState } from "react";
import API from "../api/api";
import { Loader2 } from "lucide-react";

export default function CreateNotice({ onCreate }) { // ✅ accept callback
  const [form, setForm] = useState({
    title: "",
    description: "",
    approved_by_headmaster: false,
    notice_for_date: "",
    slug: "",
    is_active: true,
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(
        "/nphs/notices/",
        form
      );

      setStatus({
        type: "success",
        message: "✅ Notice created successfully!",
      });

      setForm({
        title: "",
        description: "",
        approved_by_headmaster: false,
        notice_for_date: "",
        slug: "",
        is_active: true,
      });

      // ✅ refresh pending list immediately
      if (onCreate) onCreate();
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "❌ Failed to create notice. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4 mt-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-950 mb-6 border-b pb-3 text-center">
          Create New Notice
        </h1>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-center font-medium ${
              status.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-blue-950 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              className="w-full border border-blue-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-blue-950 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter notice description"
              rows="5"
              className="w-full border border-blue-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none"
              required
            />
          </div>

          {/* Notice Date */}
          <div>
            <label className="block text-blue-950 font-medium mb-1">
              Notice Date
            </label>
            <input
              type="date"
              name="notice_for_date"
              value={form.notice_for_date}
              onChange={handleChange}
              className="w-full border border-blue-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-950 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-200 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Creating...
                </>
              ) : (
                "➕ Create Notice"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
