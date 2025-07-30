import React from 'react';

export default function Footer() {
  return (
    <footer className="relative mt-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('school2.jpg')" }} // <- use your image path
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Footer Content */}
      <div className="relative z-10 text-white py-10 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1 */}
          <div>
            <h3 className="text-xl font-bold mb-2">Narayanpur High School</h3>
            <p className="text-sm">
              Empowering students through quality education and values.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li><a href="/" className="hover:text-yellow-300">Home</a></li>
              <li><a href="/about" className="hover:text-yellow-300">About</a></li>
              <li><a href="/contact" className="hover:text-yellow-300">Contact</a></li>
              <li><a href="/notice" className="hover:text-yellow-300">Notice</a></li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <p className="text-sm">
              📍 Chauddagram,Cumilla,Bangladesh<br />
              ☎️ +880-123456789<br />
              ✉️ narayan.edu.bd
            </p>
          </div>
        </div>

        <p className="text-center text-xs mt-8 text-gray-300">
          © {new Date().getFullYear()} High School Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
