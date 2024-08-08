import React, { useState } from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaCog,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={`settings-container ${darkMode ? "dark-mode" : ""}`}>
      <h2>Settings</h2>
      <div className="settings-content">
        <section className="settings-section">
          <div className="settings-icon">
            <FaUser />
          </div>
          <div className="settings-details">
            <h3>Profile Settings</h3>
            <p>Update your profile information here.</p>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-icon">
            <FaCog />
          </div>
          <div className="settings-details">
            <h3>Account Settings</h3>
            <p>Manage your account settings here.</p>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-icon">
            <FaBell />
          </div>
          <div className="settings-details">
            <h3>Notification Settings</h3>
            <p>Set your notification preferences here.</p>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-icon">
            <FaLock />
          </div>
          <div className="settings-details">
            <h3>Privacy Settings</h3>
            <p>Control your privacy settings here.</p>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-icon">
            <FaMoon />
          </div>
          <div className="settings-details">
            <h3>Appearance</h3>
            <div className="appearance-options">
              <button onClick={toggleDarkMode}>
                {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
              </button>
              <button className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
