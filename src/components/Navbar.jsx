import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobileOpen]);

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
      if (window.innerWidth >= 768) setMobileOpen(false);
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
        { method: "POST", headers: { Authorization: `Token ${token}` } }
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setLogoutMessage("✅ Logged out successfully");
      setTimeout(() => setLogoutMessage(""), 3000);
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError(error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Menu items for logged-in users
  const authMenuItems = [
    { label: "Result", to: "/results" },
    { label: "Profile", to: "/teacher-portal" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ];

  // Menu items for guests
  const guestMenuItems = [
    { label: "Login", to: "/login" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ];

  const menuItems = isLoggedIn ? authMenuItems : guestMenuItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col md:flex-row items-center md:justify-between bg-blue-950">
      <div className="w-full flex justify-between items-center px-4 py-3 md:py-4 md:px-6">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="School Logo" className="h-10 w-10 object-contain" />
          {!mobileOpen && (
            <span className="text-xl font-bold text-white hover:text-yellow-300 md:inline-block hidden">
              Narayanpur High School
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-white items-center">
          <NavItem label="Academic" links={[
            { label: "Documents", to: "/documents" },
            { label: "Notices", to: "/notice-approved" },
            { label: "Routine", to: "/routine" },
            { label: "Syllabus", to: "/syllabus" }
          ]} openMenu={openMenu} setOpenMenu={setOpenMenu} id="academic" />

          <NavItem label="Portals" links={[
            { label: "Students", to: "/portal" }
          ]} openMenu={openMenu} setOpenMenu={setOpenMenu} id="portals" />

          <NavItem label="Administration" links={[
            { label: "Governing Body", to: "/governing-body" },
            { label: "HeadMaster", to: "/headmaster" },
            { label: "Teacher Info", to: "/teacher" },
            { label: "Staff Info", to: "/staffs" }
          ]} openMenu={openMenu} setOpenMenu={setOpenMenu} id="admin" />

          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.to} className="hover:text-yellow-300">{item.label}</Link>
            </li>
          ))}

          {isLoggedIn && (
            <li>
              <button onClick={handleLogout} disabled={isLoggingOut} className="hover:text-yellow-300">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger */}
        <button
          aria-label="Toggle mobile menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center items-center gap-1 h-8 w-8 focus:outline-none"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div ref={mobileRef} className="md:hidden w-full bg-blue-900 text-white shadow-inner transition-all">
          <div className="px-6 py-4 space-y-2">
            <MobileLink to="/" label="Home" closeMenu={() => setMobileOpen(false)} />
            <MobileSection label="Academic">
              <MobileLink to="/routine" label="Class Routine" closeMenu={() => setMobileOpen(false)} />
              <MobileLink to="/syllabus" label="Syllabus" closeMenu={() => setMobileOpen(false)} />
              <MobileLink to="/curriculum" label="Notice" closeMenu={() => setMobileOpen(false)} />
            </MobileSection>
            <MobileSection label="Administration">
              <MobileLink to="/governing-body" label="Governing Body" closeMenu={() => setMobileOpen(false)} />
              <MobileLink to="/teachers" label="Message of HeadMaster" closeMenu={() => setMobileOpen(false)} />
              <MobileLink to="/staffs" label="Employee Info" closeMenu={() => setMobileOpen(false)} />
            </MobileSection>

            {menuItems.map((item, idx) => (
              <MobileLink key={idx} to={item.to} label={item.label} closeMenu={() => setMobileOpen(false)} />
            ))}

            {isLoggedIn && (
              <button onClick={handleLogout} className="block w-full text-left py-2">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ label, links, openMenu, setOpenMenu, id }) => (
  <li
    className="relative"
    onMouseEnter={() => setOpenMenu(id)}
    onMouseLeave={() => setOpenMenu(null)}
  >
    <button aria-haspopup="true" aria-expanded={openMenu === id} className="hover:text-yellow-300">
      {label}
    </button>
    {openMenu === id && (
      <ul className="absolute top-full left-0 bg-white text-black w-48 shadow-lg mt-1 rounded-md overflow-hidden z-10">
        {links.map((link, idx) => (
          <li key={idx} className="px-4 py-2 hover:bg-blue-100 border-b">
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const MobileSection = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between py-2 hover:text-yellow-300"
      >
        <span>{label}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="pl-4 mt-1">{children}</div>}
    </div>
  );
};

const MobileLink = ({ to, label, closeMenu }) => (
  <Link to={to} className="block py-2 hover:text-yellow-300" onClick={closeMenu}>
    {label}
  </Link>
);

export default Navbar;
