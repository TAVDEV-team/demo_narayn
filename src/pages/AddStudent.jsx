import React, { useState } from "react";
import axios from "axios";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    batch: "",
    group: "science",
    account: {
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      image: null, // file
      date_of_birth: "",
      mobile: "",
      religion: "islam",
      address: "",
      joining_date: "",
      last_educational_institute: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const keys = name.split(".");

    // Handle file input
    if (files) {
      setFormData({
        ...formData,
        [keys[0]]: { ...formData[keys[0]], [keys[1]]: files[0] },
      });
      return;
    }

    if (keys.length === 1) setFormData({ ...formData, [name]: value });
    else if (keys.length === 2)
      setFormData({
        ...formData,
        [keys[0]]: { ...formData[keys[0]], [keys[1]]: value },
      });
    else if (keys.length === 3)
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0]],
          [keys[1]]: { ...formData[keys[0]][keys[1]], [keys[2]]: value },
        },
      });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("batch", formData.batch);
    data.append("group", formData.group);
    Object.entries(formData.account.user).forEach(([key, val]) =>
      data.append(`account[user][${key}]`, val)
    );
    data.append("account[image]", formData.account.image);
    data.append("account[date_of_birth]", formData.account.date_of_birth);
    data.append("account[mobile]", formData.account.mobile);
    data.append("account[religion]", formData.account.religion);
    data.append("account[address]", formData.account.address);
    data.append("account[joining_date]", formData.account.joining_date);
    data.append(
      "account[last_educational_institute]",
      formData.account.last_educational_institute
    );

    // Log all FormData entries
    console.log("==== Submitted Form Data ====");
    for (let pair of data.entries()) {
      console.log(pair[0], ":", pair[1]);
    }

    await axios.post(
      "https://narayanpur-high-school.onrender.com/api/user/students/",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("Student added successfully!");
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Failed to add student.");
  }
};

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🎓 Add New Student
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Section 1: Batch & Group */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">Batch & Group Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">
                Batch <span className="text-red-600">*</span>
              </label>
              <input
                name="batch"
                type="number"
                placeholder="Batch (e.g., 2025)"
                value={formData.batch}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Group</label>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Account Info */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">User Account Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                name="account.user.username"
                placeholder="Username"
                value={formData.account.user.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                name="account.user.first_name"
                placeholder="First Name"
                value={formData.account.user.first_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                name="account.user.last_name"
                placeholder="Last Name"
                value={formData.account.user.last_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                name="account.user.email"
                placeholder="Email"
                type="email"
                value={formData.account.user.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                name="account.user.password"
                placeholder="Password"
                type="password"
                value={formData.account.user.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                name="account.user.confirm_password"
                placeholder="Confirm Password"
                type="password"
                value={formData.account.user.confirm_password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Additional Info */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">Additional Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">
                Image <span className="text-red-600">*</span>
              </label>
              <input
                name="account.image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Date of Birth <span className="text-red-600">*</span>
              </label>
              <input
                name="account.date_of_birth"
                type="date"
                value={formData.account.date_of_birth}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Mobile <span className="text-red-600">*</span>
              </label>
              <input
                name="account.mobile"
                placeholder="Mobile"
                value={formData.account.mobile}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Religion</label>
              <input
                name="account.religion"
                placeholder="Religion"
                value={formData.account.religion}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Address <span className="text-red-600">*</span>
              </label>
              <input
                name="account.address"
                placeholder="Address"
                value={formData.account.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Admission Date <span className="text-red-600">*</span>
              </label>
              <input
                name="account.joining_date"
                type="date"
                value={formData.account.joining_date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Last Educational Institute <span className="text-red-600">*</span>
              </label>
              <input
                name="account.last_educational_institute"
                placeholder="Last Educational Institute"
                value={formData.account.last_educational_institute}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold px-4 py-3 rounded-xl shadow hover:bg-indigo-700 transition-all"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}
