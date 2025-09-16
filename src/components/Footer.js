import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <p>&copy; {currentYear} Prompt Shop. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
