import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20  ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        
        <div>
          <h2 className="text-2xl font-bold mb-2">Rokto</h2>
          <p className="text-sm">
            An automated blood service to connect donors and seekers in seconds. 100% free. 24/7. For all.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/register" className="hover:underline">Register</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <p>Email: contact@rokto.org</p>
          <p>Phone: +880 1234-567890</p>
     
        </div>
      </div>

     
      <div className="text-center text-sm text-gray-200 mt-8 border-t border-red-500 pt-4">
        © {new Date().getFullYear()} Rokto — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
