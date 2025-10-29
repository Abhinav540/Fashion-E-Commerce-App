import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import '../styles/Navbar.css'

function Navbar({ activeSection }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
    <nav className="main-nav">
        {isHomePage ? (
          <>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              About
            </a>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/Product">Products</NavLink>
            <NavLink to="/">logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/Product">Products</NavLink>
            <NavLink to="/">logout</NavLink>
          </>
        )}
      </nav>
    </> 
  )
}

export default Navbar 