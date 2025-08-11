import React from "react";
import {
  FaHome,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="p-10 font-sans mt-16">
      <h1 className="text-center font-bold text-xl">
        Welcome to our Website. We are glad to have you around.
      </h1>

      <div className="flex flex-wrap mt-8">
        {/* Left Section */}
        <div className="flex-1 min-w-[300px] pr-5">
          {/* Section Heading */}
          <h1 className="text-4xl font-semibold mb-4 inline-block">
            Contact Info
          </h1>

          {/* Address */}
          <div className="mb-5 border-b border-gray-300 pb-3">
            <div className="flex items-center mb-1">
              <FaHome className="text-2xl mr-2" />
              <strong>Address</strong>
            </div>
            <p>Narayanpur High School, Comilla, Bangladesh</p>
          </div>

          {/* Phone */}
          <div className="mb-5 border-b border-gray-300 pb-3">
            <div className="flex items-center mb-1">
              <FaPhone className="text-2xl mr-2" />
              <strong>Phone</strong>
            </div>
            <p>+880-1811694277</p>
          </div>

          {/* Email */}
          <div className="mb-5 border-b border-gray-300 pb-3">
            <div className="flex items-center mb-1">
              <FaEnvelope className="text-2xl mr-2" />
              <strong>Email</strong>
            </div>
            <p>sn105409@gmail.com</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4 text-2xl">
            <FaFacebook />
            <FaTwitter />
            <FaGooglePlusG />
            <FaLinkedin />
            <FaInstagram />
          </div>
        </div>

        {/* Right Section - Google Map */}
        <div className="flex-1 min-w-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.158072214268!2d91.2797109!3d23.2922249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37537eafbbe3d397%3A0x2de6aa8318b565ed!2sNarayanpur%20High%20School!5e0!3m2!1sen!2sbd!4v1692553600123!5m2!1sen!2sbd"
            width="100%"
            height="300"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
