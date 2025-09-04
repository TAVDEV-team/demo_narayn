import React, { useState } from "react";
import API from "../../../api/api";
import TextInput from "../BaseAccount/TextInput";

export default function ChangePassword() {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await API.post("user/change-password/", form);
      setMessage({ type: "success", text: res.data.detail });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.detail ||
          "Failed to change password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Current Password",
      id: "old_password",
      name: "old_password",
      placeholder: "current password",
    },
    {
      label: "New Password",
      id: "new_password",
      name: "new_password",
      placeholder: "new password",
    },
    {
      label: "Confirm Password",
      id: "confirm_password",
      name: "confirm_password",
      placeholder: "new password again",
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ label, id, name, placeholder }) => (
          <TextInput
            key={id}
            label={label}
            id={id}
            name={name}
            type="password"
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange}
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
