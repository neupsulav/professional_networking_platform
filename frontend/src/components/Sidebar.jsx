import React from "react";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaUsers,
  FaBell,
  FaCog,
} from "react-icons/fa";
// create a leftsidebar
const Sidebar = () => { 
  return (
    <div className="sidebarContainer">
      <div className="sidebarTitle">
        <img src="https://storage2.timheuer.com/boratcircle.png" alt="logo" />
        <p>HamroSanjal</p>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <a href="#home">
            <FaHome className="sidebar-icon" />
            Home
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#profile">
            <FaUser className="sidebar-icon" />
            Profile
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#jobs">
            <FaBriefcase className="sidebar-icon" />
            Jobs
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#network">
            <FaUsers className="sidebar-icon" />
            Network
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#notification">
            <FaBell className="sidebar-icon" />
            Notification
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#settings">
            <FaCog className="sidebar-icon" />
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
