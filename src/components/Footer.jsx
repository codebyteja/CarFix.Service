import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-logo">
        CarFix<span>.</span>
      </div>
      <div className="footer-copy">
        &copy; {currentYear} CarFix. All rights reserved. For demonstration purposes only.
      </div>
    </footer>
  );
}
