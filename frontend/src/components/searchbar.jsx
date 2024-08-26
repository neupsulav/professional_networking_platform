import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <div className="notifications">
          <FaBell />
          <span className="notification-count">3</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
