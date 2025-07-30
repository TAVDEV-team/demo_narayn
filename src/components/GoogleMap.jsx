
import React from "react";

export default function GoogleMap() {
  return (
    <div className="px-4 md:px-20 pb-10">
      <h2 className="text-xl font-semibold mb-4">Our Location</h2>
      <div className="w-full h-96">
        <iframe
          title="Narayanpur High School Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.158072214268!2d91.2797109!3d23.2922249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37537eafbbe3d397%3A0x2de6aa8318b565ed!2sNarayanpur%20High%20School!5e0!3m2!1sen!2sbd!4v1692553600123!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded shadow"
        ></iframe>
      </div>
    </div>
  );
}
