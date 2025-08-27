import React from "react";
import {
  FaHome,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaGooglePlusG,
  FaLinkedin,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 font-sans mt-16">
      {/* Header */}
      <h1 className="text-center font-bold text-base sm:text-lg md:text-2xl lg:text-3xl">
        Welcome to our Website. We are glad to have you around.
      </h1>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row mt-8 gap-6 md:gap-10">
        {/* Left Section */}
        <div className="flex-1 w-full md:w-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-5">
            Contact Info
          </h1>

          {/* Address */}
          <div className="mb-4 border-b border-gray-300 pb-2">
            <div className="flex items-center mb-1">
              <FaHome className="text-lg sm:text-xl mr-2" />
              <strong className="text-sm sm:text-base md:text-lg">Address</strong>
            </div>
            <p className="text-sm sm:text-base md:text-lg">
              Narayanpur High School, Comilla, Bangladesh
            </p>
          </div>

          {/* Phone */}
          <div className="mb-4 border-b border-gray-300 pb-2">
            <div className="flex items-center mb-1">
              <FaPhone className="text-lg sm:text-xl mr-2" />
              <strong className="text-sm sm:text-base md:text-lg">Phone</strong>
            </div>
            <p className="text-sm sm:text-base md:text-lg">+880-1811694277</p>
          </div>

          {/* Email */}
          <div className="mb-4 border-b border-gray-300 pb-2">
            <div className="flex items-center mb-1">
              <FaEnvelope className="text-lg sm:text-xl mr-2" />
              <strong className="text-sm sm:text-base md:text-lg">Email</strong>
            </div>
            <p className="text-sm sm:text-base md:text-lg">sn105409@gmail.com</p>
          </div>

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

        {/* Right Section - Google Map */}
        <div className="flex-1 w-full md:w-auto">
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.158072214268!2d91.2797109!3d23.2922249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37537eafbbe3d397%3A0x2de6aa8318b565ed!2sNarayanpur%20High%20School!5e0!3m2!1sen!2sbd!4v1692553600123!5m2!1sen!2sbd"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
