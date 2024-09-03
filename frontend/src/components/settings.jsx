import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaLock,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import UserSettingsForm from "./UserSettingsForm";
import CompanySettingsForm from "./CompanySettingsForm";
import ChangePasswordForm from "./changepassword";
import JobForm from "./PostJobs";
import Cookies from "universal-cookie";

const Settings = ({ userType, selectedPath, setSelectedPath }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // State to track which section is active

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section); // Set the active section on click
  };

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to store user profile data
  const [profileData, setProfileData] = useState({});

  // to get user's profile data
  const getProfileData = async () => {
    const res = await fetch("/api/selfuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();

    setProfileData(response);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  //   to return components
  const returnComponent = () => {
    switch (activeSection) {
      case "profile":
        return userType === "user" ? (
          <UserSettingsForm
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            profileData={profileData}
          />
        ) : (
          <CompanySettingsForm
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
          />
        );

      case "privacy":
        return (
          <ChangePasswordForm
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
          />
        );

      case "post-jobs":
        return (
          <JobForm
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
          />
        );

      default:
        return (
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
                <section
                  className="settings-section"
                  onClick={() => {
                    setActiveSection("post-jobs");
                  }}
                >
                  <div className="settings-icon">
                    <FaBriefcase />
                  </div>
                  <div className="settings-details">
                    <h3>Post Jobs</h3>
                    <p>Post jobs here.</p>
                  </div>
                </section>
              )}

              <section
                className="settings-section"
                onClick={() => {
                  setActiveSection("privacy");
                }}
              >
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
                  </div>
                </div>
              </section>
              <section className="settings-section">
                <div className="settings-icon">
                  <FaMoon />
                </div>
                <div className="settings-details">
                  <h3>Log Out</h3>
                  <div className="appearance-options">
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
        );
    }
  };

  return <>{returnComponent()}</>;
};

export default Settings;
