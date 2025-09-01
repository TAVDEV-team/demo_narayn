import React, { useEffect, useState } from "react";
import { FaHome, FaPhone, FaEnvelope, FaFacebook, FaGooglePlusG, FaLinkedin } from "react-icons/fa";
import API from "../api/api";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [contact, setContact] = useState({});
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactRes, aboutRes] = await Promise.all([
          API.get("/nphs/schools/1"),
          API.get("/nphs/about/"),
        ]);

        setContact(contactRes.data);
        setAbout(aboutRes.data[0] || {}); // grab first if array
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load contact information.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading Contact...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 font-sans mt-16">
      <motion.h1
        className="text-center font-bold text-base sm:text-lg md:text-2xl lg:text-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to our Website. We are glad to have you around.
      </motion.h1>

      <div className="flex flex-col md:flex-row mt-8 gap-6 md:gap-10">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-5">
            Contact Info
          </h2>

          <ContactInfo icon={<FaHome />} label="Address" value={contact.location_address} />
          <ContactInfo icon={<FaPhone />} label="Phone" value={contact.contact_phone} />
          <ContactInfo icon={<FaEnvelope />} label="Email" value={contact.contact_email} />

          {/* Social Icons */}
          <div className="flex flex-wrap gap-3 mt-3 text-lg sm:text-xl">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              <FaGooglePlusG />
            </a>
            <a href="#" className="hover:text-blue-700 transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right Section - Map */}
        <div className="flex-1">
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.123456789!2d91.2810402!3d23.2918582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37537eafbbe3d397%3A0x2de6aa8318b565ed!2sNaraynpur%20High%20School!5e0!3m2!1sen!2sbd!4v1725100000000"
  // src={aboutRes.location_url|| "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.123456789!2d91.2810402!3d23.2918582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37537eafbbe3d397%3A0x2de6aa8318b565ed!2sNaraynpur%20High%20School!5e0!3m2!1sen!2sbd!4v1725100000000"}
  className="w-full h-full border-0"
  allowFullScreen
  loading="lazy"
  title="School Location"
/>

          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="mb-4 border-b border-gray-300 pb-2">
      <div className="flex items-center mb-1">
        <span className="text-lg sm:text-xl mr-2">{icon}</span>
        <strong className="text-sm sm:text-base md:text-lg">{label}</strong>
      </div>
      <p className="text-sm sm:text-base md:text-lg">{value}</p>
    </div>
  );
}
