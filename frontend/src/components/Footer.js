import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div style={{ color: 'white', backgroundColor: '#006c75', textAlign: 'center', padding: '10px' }}>
      &copy; {currentYear} ETA
    </div>
  );
};

export default Footer;