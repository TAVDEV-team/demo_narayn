import React from 'react';

export default function Footer() {
  return (
    <footer className="relative mt-8">
      
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('buildin2.jpg')" }} 
      /> */}

     
      {/* <div className="absolute inset-0 bg-black bg-opacity-60" /> */}
     <div className="absolute inset-0 bg-gradient-to-bl from-[#0f1f5f] to-black" />


    
      <div className="relative z-10 text-white py-10 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1 */}
          <div>
            <h3 className="text-3xl font-bold mb-2">Narayanpur High School</h3>
            <p className="text-balance">
              Empowering students through quality education and values.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-3xl font-bold mb-2">Quick Links</h3>
            <ul className="text-balance space-y-1">
              <li><a href="https://bangladesh.gov.bd/index.php" className="hover:text-yellow-300">Eduacation Board</a></li>
              <li><a href="https://www.nu.ac.bd/" className="hover:text-yellow-300"> Ministry Of Education</a></li>
              <li><a href="https://nctb.gov.bd/" className="hover:text-yellow-300">Directorate of secondary & Higher Education</a></li>
              <li><a href="https://comillaboard.portal.gov.bd/" className="hover:text-yellow-300">Cumilla Education Board</a></li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-3xl font-extrabold mb-2">Contact</h3>
            <p className="text-balance">
              📍 Chauddagram,Cumilla,Bangladesh<br />
              ☎️ +880-123456789<br />
              ✉️ narayan.edu.bd
            </p>
          </div>
        </div>

        <p className="text-center text-xs mt-8 text-gray-300">
          © {new Date().getFullYear()} Narayanpur High School. All rights reserved.
          <br />Depoloped By TavDev
        </p>
      </div>
    </footer>
  );
}
