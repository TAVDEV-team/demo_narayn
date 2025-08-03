import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    submenu: [
      { label: "At a glance", to: "/history" },
      { label: "History", to: "/history" },
      { label: "Events", to: "/head-teacher" },
      { label: "Achievements", to: "/achievements" },
    ],
  },
  {
    label: "Academic",
    submenu: [
      { label: "Class Routine", to: "/routine" },
      { label: "Syllabus", to: "/syllabus" },
      { label: "Notice", to: "/curriculum" },
    ],
  },
  {
    label: "Administration",
    submenu: [
      { label: "Governing Body", to: "/governing-body" },
      { label: "Message of HeadMaster", to: "/teachers" },
      { label: "Employee Information", to: "/staffs" },
    ],
  },
  { label: "Student Portal", to: "/notice-board" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null); 
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef(null);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Close on Escape
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-950 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Narayanpur High School</div>

        
        <ul className="hidden md:flex gap-6 relative text-white">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.submenu && setOpenMenu(item.label)}
              onMouseLeave={() => item.submenu && setOpenMenu(null)}
            >
              {item.submenu ? (
                <>
                  <button className="hover:text-yellow-300 flex items-center gap-1">
                    {item.label}
                  </button>
                  {openMenu === item.label && (
                    <ul className="absolute top-full left-0 bg-white text-black w-52 shadow-lg z-10 mt-1 rounded-md overflow-hidden">
                      {item.submenu.map((sub) => (
                        <li
                          key={sub.label}
                          className="px-4 py-2 hover:bg-blue-100 border-b last:border-b-0"
                        >
                          <Link to={sub.to}>{sub.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.to} className="hover:text-yellow-300">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

      
        <button
          aria-label="Toggle menu"
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

      {mobileOpen && (
        <div
          ref={mobileRef}
          className="md:hidden bg-blue-900 text-white w-full shadow-inner transition-all"
        >
          <div className="px-6 py-4 space-y-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-blue-800 pb-2">
                {item.submenu ? (
                  <DetailsDisclosure label={item.label} submenu={item.submenu} />
                ) : (
                  <Link
                    to={item.to}
                    className="block py-2 hover:text-yellow-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};


const DetailsDisclosure = ({ label, submenu }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center py-2 hover:text-yellow-300"
      >
        <span>{label}</span>
        <span className="ml-2">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="mt-1 pl-4 space-y-1">
          {submenu.map((sub) => (
            <Link
              key={sub.label}
              to={sub.to}
              className="block py-1 hover:text-yellow-300"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
