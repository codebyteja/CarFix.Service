import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div 
        className="app-container" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden'
        }}
      >
        <Nav />
        <div style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
