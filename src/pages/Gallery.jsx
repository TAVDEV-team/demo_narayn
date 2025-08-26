// // src/pages/Gallery.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// export default function Gallery() {
//   const [photos, setPhotos] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//     category: "", // added category here
//   });
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(null); 
//   const [categories, setCategories] = useState([]);
//   const [showCategoryForm, setShowCategoryForm] = useState(false);
//   const [newCategory, setNewCategory] = useState({ name: "", description: "" });

//   // Fetch photos and categories
//   useEffect(() => {
//     fetchPhotos();
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(
//         "https://narayanpur-high-school.onrender.com/api/gallery/categories/"
//       );
//       setCategories(res.data);
//       console.log(res.data)
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   const fetchPhotos = async () => {
//     try {
//       const res = await axios.get(
//         "https://narayanpur-high-school.onrender.com/api/gallery/photos/"
//       );
//       setPhotos(res.data);
//     } catch (err) {
//       console.error("Error fetching photos:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus(null);

//     try {
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       data.append("image", formData.image);
//       data.append("category", formData.category); // <-- send category ID
//       data.append("date_uploaded", new Date().toISOString());

      
//       setStatus("success");
//       setFormData({ title: "", description: "", image: null, category: "" });
//       fetchPhotos();
//       setShowForm(false);
//     } catch (error) {
//       console.error("Upload error:", error.response?.data || error.message);
//       setStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this photo?")) return;
//     try {
//       await axios.delete(
//         `https://narayanpur-high-school.onrender.com/api/gallery/photos/${id}/`
//       );
//       fetchPhotos();
//     } catch (err) {
//       console.error("Error deleting photo:", err);
//     }
//   };

//   // Group photos by category
//  const groupedPhotos = photos.reduce((groups, photo) => {
//   const cat = photo.category?.name || "Uncategorized";
//   if (!groups[cat]) groups[cat] = [];
//   groups[cat].push(photo);
//   return groups;
// }, {});


//   return (
//     <div className="min-h-screen bg-sky-50 py-12 px-4 md:px-8">
//       <div className="max-w-7xl mx-auto mt-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl font-extrabold text-center text-white bg-blue-950 rounded-full  mb-12  "
//         >
          
          
//            {!showForm && (
//           <div className=" gap-4 mt-8 mb-8">
           
//                <h1 className="text-center ">Our School gallery</h1>
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-sky-50 text-blue-950  text-lg px-4 gap-20  rounded-lg hover:bg-sky-200  transition m-5"
//             >
//               Add Photo
//             </button>
//             <button
//               onClick={() => setShowCategoryForm(true)}
//               className="bg-sky-50 text-blue-950 text-lg px-4  rounded-lg hover:bg-sky-200 transition m-5"
//             >
//               Add Category
//             </button>
//           </div>
//         )}
//         </motion.h1>

       

//         {/* Upload Form */}
//         {showForm && (
//           <div className="flex justify-center items-center">
//             <div className="bg-white rounded-2xl shadow-md p-8 space-y-4 w-full max-w-md">
//               <h2 className="text-2xl font-semibold mb-4 text-sky-800 text-center">
//                 Upload a Photo
//               </h2>
//               <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-2"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Title (e.g. Sports Day)"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-2"
//                   required
//                 />

//                 <textarea
//                   name="description"
//                   placeholder="Photo Description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-2"
//                   required
//                 />

//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="w-full"
//                   required
//                 />

//                 {loading && <p className="text-blue-600">⏳ Uploading...</p>}
//                 {status === "success" && <p className="text-green-600">✅ Upload successful!</p>}
//                 {status === "error" && <p className="text-red-600">❌ Upload failed. Try again.</p>}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition w-full"
//                 >
//                   {loading ? "Uploading..." : "Upload Photo"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Category form */}
//         {showCategoryForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//             <div className="bg-white rounded-2xl shadow-md p-8 space-y-4 w-full max-w-md">
//               <h2 className="text-2xl font-semibold mb-4 text-sky-800 text-center">
//                 Add Category
//               </h2>
//               <form
//                 onSubmit={async (e) => {
//                   e.preventDefault();
//                   try {
//                     await axios.post(
//                       "https://narayanpur-high-school.onrender.com/api/gallery/categories/",
//                       newCategory
//                     );
//                     setShowCategoryForm(false);
//                     setNewCategory({ name: "", description: "" });
//                     fetchCategories();
//                   } catch (err) {
//                     console.error("Error creating category:", err);
//                   }
//                 }}
//                 className="flex flex-col space-y-4"
//               >
//                 <input
//                   type="text"
//                   placeholder="Category Name"
//                   value={newCategory.name}
//                   onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//                   className="w-full border rounded-lg p-2"
//                   required
//                 />
//                 <textarea
//                   placeholder="Category Description"
//                   value={newCategory.description}
//                   onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
//                   className="w-full border rounded-lg p-2"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full"
//                 >
//                   Add Category
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCategoryForm(false)}
//                   className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition w-full"
//                 >
//                   Cancel
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Gallery grouped by category */}
        
// {!showForm &&
//   Object.entries(groupedPhotos).map(([categoryName, photos]) => (
//     <div key={categoryName} className="mb-12">
//       <h2 className="text-2xl font-bold text-sky-800 mb-6">{categoryName}</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {photos.length === 0 ? (
//           <p className="text-gray-500 col-span-full">No photos in this category.</p>
//         ) : (
//           photos.map((photo, index) => (
//             <motion.div
//               key={photo.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               className="relative overflow-hidden rounded-2xl shadow-lg group"
//             >
//               <img
//                 src={photo.image}
//                 alt={photo.title}
//                 className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
//               />
//               <div className="absolute top-2 right-2 flex flex-col items-end">
//                 <button
//                   onClick={() => setMenuOpen(menuOpen === photo.id ? null : photo.id)}
//                   className="bg-black bg-opacity-40 text-white px-2 py-1 rounded-full hover:bg-opacity-70 transition"
//                 >
//                   ⋮
//                 </button>
//                 {menuOpen === photo.id && (
//                   <button
//                     onClick={() => handleDelete(photo.id)}
//                     className="mt-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
//                   >
//                     🗑 Delete
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           ))
//         )}
//       </div>
//     </div>
//   ))}

//         {/* Add Photo / Add Category Buttons */}
        
//       </div>
//     </div>
//   );
// }


// src/pages/Gallery.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    category: "", // added category here
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null); 
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  // Fetch photos and categories
  useEffect(() => {
    fetchPhotos();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://narayanpur-high-school.onrender.com/api/gallery/categories/"
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(
        "https://narayanpur-high-school.onrender.com/api/gallery/photos/"
      );
      setPhotos(res.data);
    } catch (err) {
      console.error("Error fetching photos:", err);
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
      data.append("category", formData.category); // <-- send category ID
      data.append("date_uploaded", new Date().toISOString());

      await axios.post(
        "https://narayanpur-high-school.onrender.com/api/gallery/photos/",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus("success");
      setFormData({ title: "", description: "", image: null, category: "" });
      fetchPhotos();
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
      await axios.delete(
        `https://narayanpur-high-school.onrender.com/api/gallery/photos/${id}/`
      );
      fetchPhotos();
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  };

  // Group photos by category
  const groupedPhotos = photos.reduce((groups, photo) => {
    const cat = photo.category?.name || "Uncategorized";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(photo);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-white bg-blue-950 rounded-full  mb-12  "
        >
          
          
           {!showForm && (
          <div className=" gap-4 mt-8 mb-8">
           
               <h1 className="text-center ">Our School gallery</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-sky-50 text-blue-950  text-lg px-4 gap-20  rounded-lg hover:bg-sky-200  transition m-5"
            >
              Add Photo
            </button>
            <button
              onClick={() => setShowCategoryForm(true)}
              className="bg-sky-50 text-blue-950 text-lg px-4  rounded-lg hover:bg-sky-200 transition m-5"
            >
              Add Category
            </button>
          </div>
        )}
        </motion.h1>

       
        {/* Upload Form */}
        {showForm && (
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-4 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4 text-sky-800 text-center">
                Upload a Photo
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
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
                  placeholder="Title (e.g. Sports Day)"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />

                <textarea
                  name="description"
                  placeholder="Photo Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                  required
                />

                {loading && <p className="text-blue-600">⏳ Uploading...</p>}
                {status === "success" && <p className="text-green-600">✅ Upload successful!</p>}
                {status === "error" && <p className="text-red-600">❌ Upload failed. Try again.</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition w-full"
                >
                  {loading ? "Uploading..." : "Upload Photo"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Category form */}
        {showCategoryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-4 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4 text-sky-800 text-center">
                Add Category
              </h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await axios.post(
                      "https://narayanpur-high-school.onrender.com/api/gallery/categories/",
                      newCategory
                    );
                    setShowCategoryForm(false);
                    setNewCategory({ name: "", description: "" });
                    fetchCategories();
                  } catch (err) {
                    console.error("Error creating category:", err);
                  }
                }}
                className="flex flex-col space-y-4"
              >
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <textarea
                  placeholder="Category Description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full"
                >
                  Add Category
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryForm(false)}
                  className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition w-full"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Gallery grouped by category */}
        {!showForm &&
          Object.keys(groupedPhotos).map((categoryName, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-2xl font-bold text-sky-800 mb-6">{categoryName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedPhotos[categoryName].map((photo, index) => (
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
                        onClick={() => setMenuOpen(menuOpen === photo.id ? null : photo.id)}
                        className="bg-black bg-opacity-40 text-white px-2 py-1 rounded-full hover:bg-opacity-70 transition"
                      >
                        ⋮
                      </button>
                      {menuOpen === photo.id && (
                        <button
                          onClick={() => handleDelete(photo.id)}
                          className="mt-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
                        >
                          🗑 Delete
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

        {/* Add Photo / Add Category Buttons */}
       
      </div>
    </div>
  );
}

