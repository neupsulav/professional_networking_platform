import React from "react";
import { FaMapMarkerAlt, FaUsers, FaIndustry } from "react-icons/fa";
import Job from "./Job";

const CompanyProfile = () => {
  return (
    <div className="company-profile-container">
      <div className="company-profile-header">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
          alt="Company Logo"
          className="company-profile-picture"
        />
        <div className="company-profile-info">
          <h1 className="company-profile-name">Company Name</h1>
          <p className="company-profile-bio">
            This is a short bio of the company. It describes the mission,
            vision, and values of the company in a concise manner.
          </p>
          <div className="company-profile-additional-info">
            <div className="company-profile-info-item">
              <FaMapMarkerAlt /> <span>Location: Butwal, Nepal</span>
            </div>
            <div className="company-profile-info-item">
              <FaUsers /> <span>Employees: 100-500</span>
            </div>
            <div className="company-profile-info-item">
              <FaIndustry /> <span>Industry: Technology</span>
            </div>
          </div>
        </div>
      </div>
      <div className="company-profile-content">
        <div className="company-profile-section">
          <h2 className="company-profile-section-title">Overview</h2>
          <p className="company-profile-section-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
            sapien ac sem auctor scelerisque.
          </p>
        </div>
        <div className="company-profile-section">
          <h2 className="company-profile-section-title">Services</h2>
          <ul className="company-profile-section-list">
            <li>Service 1: Description of service 1.</li>
            <li>Service 2: Description of service 2.</li>
            <li>Service 3: Description of service 3.</li>
          </ul>
        </div>
        <div className="company-profile-section">
          <h2 className="company-profile-section-title">Contact Information</h2>
          <p className="company-profile-section-text">
            <strong>Email:</strong> contact@company.com
          </p>
          <p className="company-profile-section-text">
            <strong>Phone:</strong> +977-9869948166
          </p>
          <p className="company-profile-section-text">
            <strong>Address:</strong> Butwal,Nepal
          </p>
        </div>
      </div>

      <div className="profile_posts_container">
        <p className="profile_posts_container_title">Jobs</p>
        {/* <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job /> */}
      </div>
    </div>
  );
};

export default CompanyProfile;
