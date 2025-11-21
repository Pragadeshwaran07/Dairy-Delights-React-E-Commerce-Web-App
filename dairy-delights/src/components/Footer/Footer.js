import React from "react";
import { FaFacebook, FaInstagram, FaYoutubeSquare } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Dairy Delights. All rights reserved.</p>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <FaYoutubeSquare />
        </a>
      </div>
    </footer>
  );
}

export default Footer;