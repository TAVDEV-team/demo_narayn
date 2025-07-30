import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 🔁 Detect path changes
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // 🔄 Re-check auth state on route change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);


  return (
    <div className="bg-white text-white py-2 absolute top-0 left-0 w-full z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold uppercase">N</h1>

          <ul className="hidden md:flex space-x-10 text-xl">
            <li><Link to="/">Home</Link></li>
            
          </ul>

          <div className="md:hidden">
            <GiHamburgerMenu className="text-3xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
