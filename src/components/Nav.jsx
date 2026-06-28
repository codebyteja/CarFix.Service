import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  // Highlight scroll changes for glassmorphism
  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // 300ms scroll idle delay
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Close overlay on route change
  useEffect(() => {
    setIsOpen(false);
    document.body.classList.remove('no-scroll');
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <header className={`header ${isScrolling ? 'scrolling' : ''}`} id="main-header">
      <NavLink to="/" className="logo" onClick={closeMenu}>
        CarFix<span>.</span>
      </NavLink>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <NavLink to="/" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`} end>
          Home
        </NavLink>
        <NavLink to="/inventory" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
          Services
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
          Contact
        </NavLink>
      </nav>

      {/* Hamburger Menu (Mobile Only) */}
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle Navigation Menu"
        aria-expanded={isOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Mobile Nav Overlay */}
      <div className={`nav-overlay ${isOpen ? 'open' : ''}`}>
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Services
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
