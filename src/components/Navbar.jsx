import React, { useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import '../styles/Navbar.css'

function Navbar({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); // Close menu after click
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close menu when clicking any link
  };

  return (
    <>
      <nav className="main-nav">
        {/* Mobile Menu Toggle */}
        <button 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
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
              <NavLink to="/users" onClick={handleLinkClick}>Users</NavLink>
              <NavLink to="/Product" onClick={handleLinkClick}>Products</NavLink>
              <NavLink to="/" onClick={handleLinkClick}>Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/home" onClick={handleLinkClick}>Home</NavLink>
              <NavLink to="/about" onClick={handleLinkClick}>About</NavLink>
              <NavLink to="/users" onClick={handleLinkClick}>Users</NavLink>
              <NavLink to="/Product" onClick={handleLinkClick}>Products</NavLink>
              <NavLink to="/" onClick={handleLinkClick}>Logout</NavLink>
            </>
          )}
        </div>

        {/* Overlay for mobile menu */}
        <div 
          className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      </nav>
    </> 
  )
}

export default Navbar 