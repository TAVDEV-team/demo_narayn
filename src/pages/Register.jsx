import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    First_name: "",
    Last_name: "",
    Email_address: "",
    Password: "",
    Confirm_password: "",
    Image: null,
    Date_of_birth: "",
    Mobile: "",
    Religion: "",
    Adress: "",
    Joining_date: "",
    Last_educational_institution: "",
    Base_subject: "",
    Is_class_teacher: "",
    Class_teacher_of: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.Password !== form.Confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const res = await axios.post(
        "https://narayanpur-high-school.onrender.com/api/user/teachers/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-sky-50 flex items-center justify-center px-6 mt-10">
        <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-10">
          <h2 className="text-4xl font-bold text-blue-700 text-center mb-10">
            Teacher Registration
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
          >
            {/* All your input fields here, unchanged */}
            {/* Username */}
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-semibold mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* First Name */}
            <div className="flex flex-col">
              <label htmlFor="First_name" className="text-sm font-semibold mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="First_name"
                name="First_name"
                value={form.First_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label htmlFor="Last_name" className="text-sm font-semibold mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="Last_name"
                name="Last_name"
                value={form.Last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label htmlFor="Email_address" className="text-sm font-semibold mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="Email_address"
                name="Email_address"
                value={form.Email_address}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="Password" className="text-sm font-semibold mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="Password"
                name="Password"
                value={form.Password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label htmlFor="Confirm_password" className="text-sm font-semibold mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="Confirm_password"
                name="Confirm_password"
                value={form.Confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Profile Image */}
            <div className="flex flex-col">
              <label htmlFor="Image" className="text-sm font-semibold mb-2">
                 Image
              </label>
              <input
                type="file"
                id="Image"
                name="Image"
                onChange={handleFileChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full text-lg"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label htmlFor="Date_of_birth" className="text-sm font-semibold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="Date_of_birth"
                name="Date_of_birth"
                value={form.Date_of_birth}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col">
              <label htmlFor="Mobile" className="text-sm font-semibold mb-2">
                Mobile
              </label>
              <input
                id="Mobile"
                name="Mobile"
                value={form.Mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Religion */}
            <div className="flex flex-col">
              <label htmlFor="Religion" className="text-sm font-semibold mb-2">
                Religion
              </label>
              <input
                id="Religion"
                name="Religion"
                value={form.Religion}
                onChange={handleChange}
                placeholder="Enter your religion"
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="Adress" className="text-sm font-semibold mb-2">
                Address
              </label>
              <input
                id="Adress"
                name="Adress"
                value={form.Adress}
                onChange={handleChange}
                placeholder="Enter your address"
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Joining Date */}
            <div className="flex flex-col">
              <label htmlFor="Joining_date" className="text-sm font-semibold mb-2">
                Joining Date
              </label>
              <input
                type="date"
                id="Joining_date"
                name="Joining_date"
                value={form.Joining_date}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Last Educational Institution */}
            <div className="flex flex-col">
              <label
                htmlFor="Last_educational_institution"
                className="text-sm font-semibold mb-2"
              >
                Last Educational Institution
              </label>
              <input
                id="Last_educational_institution"
                name="Last_educational_institution"
                value={form.Last_educational_institution}
                onChange={handleChange}
                placeholder="Enter your last educational institution"
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Base Subject */}
            <div className="flex flex-col">
              <label htmlFor="Base_subject" className="text-sm font-semibold mb-2">
                Base Subject
              </label>
              <input
                id="Base_subject"
                name="Base_subject"
                value={form.Base_subject}
                onChange={handleChange}
                placeholder="Enter your base subject"
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Is Class Teacher */}
            <div className="flex flex-col">
              <label htmlFor="Is_class_teacher" className="text-sm font-semibold mb-2">
                Is Class Teacher
              </label>
              <select
                id="Is_class_teacher"
                name="Is_class_teacher"
                value={form.Is_class_teacher}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Class Teacher Of */}
            <div className="flex flex-col">
              <label htmlFor="Class_teacher_of" className="text-sm font-semibold mb-2">
                Class Teacher Of
              </label>
              <input
                id="Class_teacher_of"
                name="Class_teacher_of"
                value={form.Class_teacher_of}
                onChange={handleChange}
                placeholder="Enter the class you teach"
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            <div className="mt-10 col-span-full">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-md text-lg"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
