import React, { useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaLock,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import UserSettingsForm from "./UserSettingsForm";
import CompanySettingsForm from "./CompanySettingsForm";

const Settings = ({ userType }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // State to track which section is active

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section); // Set the active section on click
  };

  return (
    <>
      {activeSection === "profile" ? (
        userType === "user" ? (
          <UserSettingsForm />
        ) : (
          <CompanySettingsForm />
        )
      ) : (
        <div className={`settings-container ${darkMode ? "dark-mode" : ""}`}>
          <h2>Settings</h2>
          <div className="settings-content">
            <section
              className="settings-section"
              onClick={() => handleSectionClick("profile")}
            >
              <div className="settings-icon">
                <FaUser />
              </div>
              <div className="settings-details">
                <h3>Profile Settings</h3>
                <p>Update your profile information here.</p>
              </div>
            </section>

            {userType === "company" && (
              <section className="settings-section">
                <div className="settings-icon">
                  <FaBriefcase />
                </div>
                <div className="settings-details">
                  <h3>Post Jobs</h3>
                  <p>Post jobs here.</p>
                </div>
              </section>
            )}

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
                  {/* <div>
                    <button className="logout-button">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div> */}
                </div>
              </div>
            </section>

            <section className="settings-section">
              <div className="settings-icon">
                <FaMoon />
              </div>
              <div className="settings-details">
                <h3>Logout</h3>
                <div className="appearance-options">
                  {/* <button>Logout</button> */}
                  <div>
                    <button className="logout-button">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
