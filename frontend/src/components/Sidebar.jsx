/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaUsers,
  FaBell,
  FaCog,
} from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

// create a leftsidebar
const Sidebar = ({
  selectedPath,
  setSelectedPath,
  isSidebarActive,
  setIsSidebarActive,
  userType,
}) => {
  return (
    <div
      className={
        isSidebarActive ? "sidebarContainer sidebar_active" : "sidebarContainer"
      }
    >
      <RxCross1
        className="cross_icon"
        onClick={() => {
          setIsSidebarActive(false);
        }}
      />
      <div className="sidebarTitle">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
          alt="logo"
        />
        <p>HamroSanjal</p>
      </div>
      <ul className="sidebar-menu">
        {userType === "user" && (
          <li
            className={
              selectedPath === 0 ? "active-link sidebar-item" : "sidebar-item"
            }
          >
            <div
              onClick={() => {
                setSelectedPath(0);
              }}
            >
              <FaHome className="sidebar-icon" />
              Home
            </div>
          </li>
        )}
        <li
          className={
            selectedPath === 1 ? "active-link sidebar-item" : "sidebar-item"
          }
        >
          <div
            onClick={() => {
              setSelectedPath(1);
            }}
          >
            <FaUser className="sidebar-icon" />
            Profile
          </div>
        </li>
        {userType === "user" && (
          <li
            className={
              selectedPath === 2 ? "active-link sidebar-item" : "sidebar-item"
            }
          >
            <div
              onClick={() => {
                setSelectedPath(2);
              }}
            >
              <FaBriefcase className="sidebar-icon" />
              Jobs
            </div>
          </li>
        )}
        {userType === "user" && (
          <li
            className={
              selectedPath === 3 ? "active-link sidebar-item" : "sidebar-item"
            }
          >
            <div
              onClick={() => {
                setSelectedPath(3);
              }}
            >
              <FaUsers className="sidebar-icon" />
              Recommendations
            </div>
          </li>
        )}
        <li
          className={
            selectedPath === 4 ? "active-link sidebar-item" : "sidebar-item"
          }
        >
          <div
            onClick={() => {
              setSelectedPath(4);
            }}
          >
            <FaBell className="sidebar-icon" />
            Notification
          </div>
        </li>
        <li
          className={
            selectedPath === 5 ? "active-link sidebar-item" : "sidebar-item"
          }
        >
          <div
            onClick={() => {
              setSelectedPath(5);
            }}
          >
            <FaCog className="sidebar-icon" />
            Settings
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
