import React from 'react';
import logo from "./images/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-links">
        <a href="/Signup-Options" className="login-link">Register</a>
      </div>
    </nav>
  );
}

export default Navbar;
