import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/api";
import {
  Plus,
  ImagePlus,
  FolderPlus,
  Trash2,
  MoreVertical,
  X,
} from "lucide-react";

// Category Form Modal
function CategoryForm({ setShowCategoryForm, newCategory, setNewCategory, fetchCategories }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
            <FolderPlus className="w-5 h-5" /> Add Category
          </h3>
          <button
            onClick={() => setShowCategoryForm(false)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await API.post(
                "/gallery/categories/",
                newCategory
              );
              setShowCategoryForm(false);
              setNewCategory({ name: "", description: "" });
              fetchCategories();
            } catch (err) {
              console.error("Error creating category:", err);
            }
          }}
          className="px-6 py-5 space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Sports, Events, Classrooms"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Short description for this category"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowCategoryForm(false)}
              className="px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <FolderPlus className="w-4 h-4" /> Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Gallery
export default function Gallery() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get(
        "/gallery/categories/"
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("image", formData.image);
      data.append("category", parseInt(formData.category, 10));
      data.append("date_uploaded", new Date().toISOString());

      await API.post(
        "/gallery/photos/",
        data
      );

      setStatus("success");
      setFormData({ title: "", description: "", image: null, category: "" });
      fetchCategories();
      setShowForm(false);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      await API.delete(
        `/gallery/photos/${id}/`
      );
      fetchCategories();
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mt-8">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-blue-950 mb-12 tracking-tight"
        >
          📸 Our School Gallery
        </motion.h1>

        {/* Add buttons */}
        {!showForm && !showCategoryForm && (
          <div className="flex justify-center gap-6 mb-10">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            >
              <ImagePlus className="w-5 h-5" /> Add Photo
            </button>
            <button
              onClick={() => setShowCategoryForm(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-xl shadow hover:bg-emerald-700 transition"
            >
              <FolderPlus className="w-5 h-5" /> Add Category
            </button>
          </div>
        )}

        {/* Upload Photo form */}
        {showForm && (
          <div className="flex justify-center items-center mb-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4 w-full max-w-md border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 text-center flex items-center justify-center gap-2">
                <Plus className="w-6 h-6" /> Upload a Photo
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  required
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />

                {loading && <Loading message="Uploading"/>}
                {status === "success" && (
                  <p className="text-green-600">✅ Upload successful!</p>
                )}
                {status === "error" && (
                  <p className="text-red-600">❌ Upload failed.</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {loading ? "Uploading..." : "Upload Photo"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {showCategoryForm && (
          <CategoryForm
            setShowCategoryForm={setShowCategoryForm}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            fetchCategories={fetchCategories}
          />
        )}

        {/* Render categories */}
        {categories.map((cat) => (
          <div key={cat.id} className="mb-16">
            <h2 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              📂 {cat.name}
            </h2>
            <p className="text-gray-600 mb-6">{cat.description}</p>

            {cat.photos.length === 0 ? (
              <p className="text-gray-400 italic">No photos in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cat.photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-2xl shadow-lg group"
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-2 right-2 flex flex-col items-end">
                      <button
                        onClick={() =>
                          setMenuOpen(menuOpen === photo.id ? null : photo.id)
                        }
                        className="bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {menuOpen === photo.id && (
                        <button
                          onClick={() => handleDelete(photo.id)}
                          className="mt-2 flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
  