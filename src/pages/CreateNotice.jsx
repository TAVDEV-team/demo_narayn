import React, { useState } from "react";
import axios from "axios";

export default function CreateNotice() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    approved_by_headmaster: false,
    notice_for_date: "",
    slug: "",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://narayanpur-high-school.onrender.com/api/nphs/notices/",
        form
      );
      alert("✅ Notice created successfully!");
      setForm({
        title: "",
        description: "",
        approved_by_headmaster: false,
        notice_for_date: "",
        slug: "",
        is_active: true,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create notice.");
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 py-10 px-4 mt-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 text-center">
          Create New Notice
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

        
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter notice description"
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

         
          {/* <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="approved_by_headmaster"
              checked={form.approved_by_headmaster}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500 focus:ring-blue-400 rounded"
            />
            <label className="text-gray-700">Approved by Headmaster</label>
          </div> */}

         
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Notice Date
            </label>
            <input
              type="date"
              name="notice_for_date"
              value={form.notice_for_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

         
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="Unique identifier for notice"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div> */}

          
          {/* <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500 focus:ring-blue-400 rounded"
            />
            <label className="text-gray-700">Active</label>
          </div> */}

          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              ➕ Create Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
