// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";


export default function RegisterForm() {
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false); // loading state
  const [success, setSuccess] = useState("");   // success message
  const [error, setError] = useState(""); 

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    image: null,
    date_of_birth: "",
    mobile: "",
    religion: "",
    adress: "",
    joining_date: "",
    last_educational_institute: "",
    base_subject: "",
    is_class_teacher: "",
    class_teacher_of: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirm_password) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const payload = {
      account: {
        user: {
          username: form.username,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
          confirm_password: form.confirm_password,
        },
        image: form.image, // works if backend accepts file in multipart
        date_of_birth: form.date_of_birth,
        mobile: form.mobile,
        religion: form.religion,
        gender: form.gender || "Male", // add dropdown in form
        address: form.adress, // fix spelling
        joining_date: form.joining_date,
        last_educational_institute: form.last_educational_institute,
      },
      base_subject: Number(form.base_subject), // should be ID
      is_class_teacher: form.is_class_teacher === "yes",
      class_teacher_of: Number(form.class_teacher_of) || 0,
    };

    console.log("Payload:", payload);

    const res = await axios.post(
      "https://narayanpur-high-school.onrender.com/api/user/teachers/",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.status === 201 || res.status === 200) {
      toast.success("Registration successful!");
      navigate("/");
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.detail || "Registration failed");
  }
};

const [classes, setClasses] = useState([]);

useEffect(() => {
  axios.get("https://narayanpur-high-school.onrender.com/api/nphs/classes/") 
    .then((res) => {
      console.log(res.data); // check the shape here
      setClasses(res.data);
    })
    .catch((err) => console.error(err));
}, []);


  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-sky-50 flex items-center justify-center px-6 mt-20">
        <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-10">
          <h2 className="text-4xl font-bold text-blue-950 text-center mb-10">
            Teacher Registration
          </h2>
           {loading && (
          <div className="flex items-center justify-center mb-4 text-blue-950 font-semibold">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-blue-950"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Submitting...
          </div>
        )}

        {success && (
          <p className="text-green-600 font-semibold mb-4">{success}</p>
        )}

        {error && (
          <p className="text-red-600 font-semibold mb-4">{error}</p>
        )}
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
                id="first_name"
                name="first_name"
                value={form.first_name}
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
                id="last_name"
                name="last_name"
                value={form.last_name}
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
                id="email"
                name="email"
                value={form.email}
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
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label htmlFor="confirm_password" className="text-sm font-semibold mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Profile Image */}
            <div className="flex flex-col">
              <label htmlFor="image" className="text-sm font-semibold mb-2">
                 Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full text-lg"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label htmlFor="date_of_birth" className="text-sm font-semibold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-sm font-semibold mb-2">
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Religion */}
           <div className="flex flex-col">
  <label htmlFor="religion" className="text-sm font-semibold mb-2">
    Religion
  </label>
  <select
  id="religion"
  name="religion"
  value={form.religion}
  onChange={handleChange}
  className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
>
  <option value="">Select religion</option>
  <option value="islam">islam</option>
  <option value="hinduism">hinduism</option>
</select>


</div>


           <div className="flex flex-col">
  <label htmlFor="gender" className="text-sm font-semibold mb-2">
    Gender
  </label>
 <select
  id="gender"
  name="gender"
  value={form.gender}
  onChange={handleChange}
  className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
>
  <option value="">Select gender</option>
  <option value="male">male</option>
  <option value="female">female</option>
</select>


</div>

            {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="adress" className="text-sm font-semibold mb-2">
                Address
              </label>
              <input
                id="adress"
                name="adress"
                value={form.adress}
                onChange={handleChange}
                placeholder="Enter your address"
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Joining Date */}
            <div className="flex flex-col">
              <label htmlFor="joining_date" className="text-sm font-semibold mb-2">
                Joining Date
              </label>
              <input
                type="date"
                id="joining_date"
                name="joining_date"
                value={form.joining_date}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
              />
            </div>

            {/* Last Educational Institution */}
            <div className="flex flex-col">
              <label
                htmlFor="last_educational_institution"
                className="text-sm font-semibold mb-2"
              >
                Last Educational Institution
              </label>
              <input
                id="last_educational_institute"
                name="last_educational_institute"
                value={form.last_educational_institute}
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
                id="base_subject"
                name="base_subject"
                value={form.base_subject}
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
                id="is_class_teacher"
                name="is_class_teacher"
                value={form.is_class_teacher}
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
  <label htmlFor="class_teacher_of" className="text-sm font-semibold mb-2">
    Class Teacher Of
  </label>
  <select
    id="class_teacher_of"
    name="class_teacher_of"
    value={form.class_teacher_of}
    onChange={handleChange}
    className="border border-gray-300 px-4 py-3 rounded-md w-full text-lg"
  >
    <option value="">Select a class</option>
    {classes.map((cls) => (
      <option key={cls.id} value={cls.id}>
        {cls.name}
      </option>
    ))}
  </select>
</div>


           <div className="mt-10 col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-4 rounded-lg shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
