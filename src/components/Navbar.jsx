// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import AddStudent from '../pages/AddStudent';


const Navbar = () => {
  // which top-level submenu is open on desktop ("about", "academic", "admin" or null)
  const [openMenu, setOpenMenu] = useState(null);
  // mobile menu open state
  const [mobileOpen, setMobileOpen] = useState(false);
  // whether page is scrolled (for background/shadow)
  const [scrolled, setScrolled] = useState(false);
  const mobileRef = useRef(null);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [logoutMessage, setLogoutMessage] = useState("");
const [isLoggingOut, setIsLoggingOut] = useState(false);
const [logoutError, setLogoutError] = useState(null);



useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);
}, []);



  // scroll detection for background styling
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close mobile menu when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobileOpen]);

  // close everything on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // if window resizes to desktop width, ensure mobile is closed
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  

const handleLogout = async () => {
  setIsLoggingOut(true);
  setLogoutError(null);
  setLogoutMessage("");

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://narayanpur-high-school.onrender.com/api/user/logout/",
      {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error: ${res.status} ${text}`);
    }

    // Remove token locally
    localStorage.removeItem("token");

    // Update state so Navbar re-renders instantly
    setIsLoggedIn(false);

    // Show a temporary message
    setLogoutMessage("✅ Logged out successfully");

    // Remove message after 3 seconds
    setTimeout(() => setLogoutMessage(""), 3000);
  } catch (error) {
    console.error("Logout failed:", error);
    setLogoutError(error.message);
  } finally {
    setIsLoggingOut(false);
  }
};



  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all bg-blue-950 duration-300 flex items-center w-full"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center w-full">
       
<Link to="/" className="flex items-center gap-3 hover:opacity-90">
  <img
  src="/logo.png"
  alt="School Logo"
  className="h-10 w-10 object-contain" 
/>
  <span className="text-4xl font-bold text-white hover:text-yellow-300">
    Narayanpur High School
  </span>
</Link>


        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 relative text-white">
          
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu("admission")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              aria-haspopup="true"
              aria-expanded={openMenu === "admission"}
              className="hover:text-yellow-300 flex items-center gap-1"
            >
              Academic
            </button>
            {openMenu === "admission" && (
              <ul className="absolute top-full left-0 bg-white text-black w-48 shadow-lg z-10 mt-1 rounded-md overflow-hidden">
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/documents">Documents</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/routine">Routine</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/syllabus">Syllabus</Link>
                </li>
              </ul>
            )}
          </li>


          {/* Academic dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu("academic")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              aria-haspopup="true"
              aria-expanded={openMenu === "academic"}
              className="hover:text-yellow-300 flex items-center gap-1"
            >
              Portals
            </button>
            {openMenu === "academic" && (
              <ul className="absolute top-full left-0 bg-white text-black w-48 shadow-lg z-10 mt-1 rounded-md overflow-hidden">
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/portal">Students Portal</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/teacher-portal">Teachers Portal</Link>
                </li>
                {/* <li className="px-4 py-2 hover:bg-blue-100">
                  <Link to="/curriculum">Notice</Link>
                </li> */}
              </ul>
            )}
          </li>

          {/* Administration dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu("admin")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              aria-haspopup="true"
              aria-expanded={openMenu === "admin"}
              className="hover:text-yellow-300 flex items-center gap-1"
            >
              Administration
            </button>
            {openMenu === "admin" && (
              <ul className="absolute top-full left-0 bg-white text-black w-48 shadow-lg z-10 mt-1 rounded-md overflow-hidden">
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/governing-body">Governing Body</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 border-b">
                  <Link to="/headmaster">HeadMaster</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100">
                  <Link to="/teacher">Teacher Information</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-100">
                  <Link to="/staffs">Staff Information</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Other links */}
          {/* Notice dropdown */}
<li
  className="relative"
  onMouseEnter={() => setOpenMenu("notice")}
  onMouseLeave={() => setOpenMenu(null)}
>
  <button
    aria-haspopup="true"
    aria-expanded={openMenu === "notice"}
    className="hover:text-yellow-300 flex items-center gap-1"
  >
    Notice
  </button>
  {openMenu === "notice" && (
    <ul className="absolute top-full left-0 bg-white text-black w-56 shadow-lg z-10 mt-1 rounded-md overflow-hidden">
      <li className="px-4 py-2 hover:bg-blue-100 border-b">
        <Link to="/notice-approved">Approved Notices</Link>
      </li>
      {/* <li className="px-4 py-2 hover:bg-blue-100 border-b">
        <Link to="/notices-create">Create Notice</Link>
      </li> */}
      <li className="px-4 py-2 hover:bg-blue-100 border-b">
        <Link to="/notice-pending">Pending Notices</Link>
      </li>
      {/* <li className="px-4 py-2 hover:bg-blue-100">
        <Link to="/notice-details">Notice Details</Link>
      </li> */}
    </ul>
  )}
</li>

          <li>
            <Link to="/fund" className="hover:text-yellow-300">
              Fund
            </Link>
          </li>
          <li>
            <Link to="/results" className="hover:text-yellow-300">
              Result
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
           <li>
            <Link to="/register" className="hover:text-yellow-300">
              Register
            </Link>
          </li>
      <li>
  {isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="hover:text-yellow-300"
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  ) : (
    <Link to="/login" className="hover:text-yellow-300">
      Login
    </Link>
  )}
  {logoutMessage && <span className="text-green-400 ml-2">{logoutMessage}</span>}
  {logoutError && <span className="text-red-400 ml-2">{logoutError}</span>}
</li>


        </ul>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle mobile menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden flex items-center gap-1 text-white focus:outline-none"
        >
          <div className="space-y-1">
            <div
              className={`w-6 h-0.5 transition-transform duration-300 bg-white ${
                mobileOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 transition-opacity duration-300 bg-white ${
                mobileOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 transition-transform duration-300 bg-white ${
                mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </div>
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          ref={mobileRef}
          className="md:hidden bg-blue-900 text-white w-full shadow-inner transition-all"
        >
          <div className="px-6 py-4 space-y-4">
            {/* Home */}
            <div className="border-b border-blue-800 pb-2">
              <Link
                to="/"
                className="block py-2 hover:text-yellow-300"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </div>

            {/* About Us with disclosure */}
            <MobileSection label="About Us" defaultOpen={false} onCloseParent={() => {}}>
              <div className="pl-2 space-y-1">
                <Link
                  to="/history"
                  className="block py-1 hover:text-yellow-300"
                  onClick={() => setMobileOpen(false)}
                >
                  At a glance
                </Link>
                <Link
                  to="/history"
                  className="block py-1 hover:text-yellow-300"
                  onClick={() => setMobileOpen(false)}
                >
                  History
                </Link>
                <Link
                  to="/head-teacher"
                  className="block py-1 hover:text-yellow-300"
                  onClick={() => setMobileOpen(false)}
                >
                  Events
                </Link>
                <Link
                  to="/achievements"
                  className="block py-1 hover:text-yellow-300"
                  onClick={() => setMobileOpen(false)}
                >
                  Achievements
                </Link>
              </div>
            </MobileSection>

            {/* Academic */}
            <div className="border-b border-blue-800 pb-2">
              <MobileSection label="Academic" defaultOpen={false}>
                <div className="pl-2 space-y-1">
                  <Link
                    to="/routine"
                    className="block py-1 hover:text-yellow-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    Class Routine
                  </Link>
                  <Link
                    to="/syllabus"
                    className="block py-1 hover:text-yellow-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    Syllabus
                  </Link>
                  <Link
                    to="/curriculum"
                    className="block py-1 hover:text-yellow-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    Notice
                  </Link>
                </div>
              </MobileSection>
            </div>

            {/* Administration */}
            <div className="border-b border-blue-800 pb-2">
              <MobileSection label="Administration" defaultOpen={false}>
                <div className="pl-2 space-y-1">
                  <Link
                    to="/governing-body"
                    className="block py-1 hover:text-yellow-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    Governing Body
                  </Link>
                  <Link
                    to="/teachers"
                    className="block py-1 hover:text-yellow-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    Message of HeadMaster
                  </Link>
                  <Link
                    to="/staffs"
                    className="block py-1 hover:text-yellow-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    Employee Information
                  </Link>
                </div>
              </MobileSection>
            </div>

            {/* Other links */}
            <div className="border-b border-blue-800 pb-2">
              <Link
                to="/student portal"
                className="block py-2 hover:text-yellow-300"
                onClick={() => setMobileOpen(false)}
              >
                Student Portal
              </Link>
            </div>
            <div className="border-b border-blue-800 pb-2">
              <Link
                to="/Fund"
                className="block py-2 hover:text-yellow-300"
                onClick={() => setMobileOpen(false)}
              >
                Fund
              </Link>
            </div>
            <div className="border-b border-blue-800 pb-2">
              <Link
                to="/gallery"
                className="block py-2 hover:text-yellow-300"
                onClick={() => setMobileOpen(false)}
              >
                Gallery
              </Link>
            </div>
            <div>
              <Link
                to="/contact"
                className="block py-2 hover:text-yellow-300"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="border-b border-blue-800 pb-2">
  {isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="block w-full text-left py-2 hover:text-yellow-300"
    >
      Logout
    </button>
  ) : (
    <Link
      to="/login"
      className="block py-2 hover:text-yellow-300"
      onClick={() => setMobileOpen(false)}
    >
      Login
    </Link>
  )}
</div>

          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable disclosure for mobile submenu
const MobileSection = ({ label, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pb-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center py-2 hover:text-yellow-300"
        aria-expanded={open}
        aria-controls={`mobile-section-${label}`}
      >
        <span>{label}</span>
        <span className="ml-2">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div id={`mobile-section-${label}`} className="mt-1 pl-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Navbar;
