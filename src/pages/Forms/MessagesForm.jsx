import React, { useState } from "react";
import API from "../../api/api";
import TextInput from "./BaseAccount/TextInput";
import CardHeader from "../../components/Titles/CardHeads";

export default function AddMessage() {
  const [form, setForm] = useState({
    message: "",    
    message_of_id: "", // who is posting
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await API.post("nphs/message/", {
        message: form.message,
        message_of_id: parseInt(form.message_of_id, 10),
      });
      setFeedback({ type: "success", text: res.data.detail || "Message added!" });
      setForm({ message: "", message_of_id: "" });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err.response?.data?.detail ||
          "Failed to add message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Add Message",
      id: "message",
      name: "message",
      type: "text",
      placeholder: "Enter your message...",
    }
  ];

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md">
      <CardHeader text="Add Message" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ label, id, name, type, placeholder }) => (
          <TextInput
            key={id}
            label={label}
            id={id}
            name={name}
            type={type}
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
          {loading ? "Adding..." : "Add Message"}
        </button>
      </form>

      {feedback && (
        <p
          className={`mt-4 text-center ${
            feedback.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback.text}
        </p>
      )}
    </div>
  );
}
