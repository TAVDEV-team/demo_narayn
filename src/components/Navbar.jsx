import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">Narayanpur High School</div>

        <ul className="hidden md:flex gap-6 relative">
          {/* Home */}
          <li>
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>
          </li>

          {/* About Us with submenu */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenMenu("about")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="hover:text-yellow-300">About Us</button>
            {openMenu === "about" && (
              <ul className="absolute top-full left-0 bg-white text-black w-48 shadow-lg z-10">
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/history">At a glance</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/mission-&-vision">History</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/head-teacher">Events</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100">
                  <Link to="/achievements">Achievements</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Academic */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenMenu("academic")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="hover:text-yellow-300">Academic</button>
            {openMenu === "academic" && (
              <ul className="absolute top-full left-0 bg-white text-black w-48 shadow-lg z-10">
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/routine">Class Routine</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/syllabus">Syllabus</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100">
                  <Link to="/curriculum">Notice</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Administration */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenMenu("admin")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="hover:text-yellow-300">Administration</button>
            {openMenu === "admin" && (
              <ul className="absolute top-full left-0 bg-white text-black w-48 shadow-lg z-10">
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/governing-body">Governing Body</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/teachers">Message of HeadMaster</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100">
                  <Link to="/staffs">Message of </Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100">
                  <Link to="/staffs">Employee Information</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Admission */}
          {/* <li
            className="relative group"
            onMouseEnter={() => setOpenMenu("admission")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="hover:text-yellow-300">Admission</button>
            {openMenu === "admission" && (
              <ul className="absolute top-full left-0 bg-white text-black w-48 shadow-lg z-10">
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/online-form">Online Form</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100">
                  <Link to="/admission-rules">Admission Rules</Link>
                </li>
              </ul>
            )}
          </li> */}

          {/* Single links (no submenu) */}
          <li>
            <Link to="/notice-board" className="hover:text-yellow-300">
              Student Portal
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="hover:text-yellow-300">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

// trisha
