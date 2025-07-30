import React from "react";

const ContactForm = () => {
  return (
    <form className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Send Us a Message</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Your Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Mobile No</label>
          <input
            type="text"
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Subject</label>
        <input
          type="text"
          placeholder="Reason for Contact"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Message</label>
        <textarea
          placeholder="Write your message..."
          className="w-full px-4 py-2 border rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-xl transition duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
