import React, { useDebugValue, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUsers, FaIndustry } from "react-icons/fa";
import Job from "./Job";
import Cookies from "universal-cookie";
import ProfileJob from "./ProfileJob";

const CompanyProfile = () => {
  // to store data
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [selfProfileData, setSelfProfileData] = useState();
  const [isJobsFetched, setIsJobsFetched] = useState(false);

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to get self company profile data
  const getSelfProfileData = async () => {
    const res = await fetch("/api/getcompanyselfprofile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    if (res.status === 200) {
      setSelfProfileData(response);
      setIsDataFetched(true);
      setIsJobsFetched(true);
    }
  };

  useEffect(() => {
    getSelfProfileData();
  }, []);

  return (
    <>
      {isDataFetched && (
        <div className="company-profile-container">
          <div className="company-profile-header">
            <img
              src={selfProfileData.company.image}
              alt="Company Logo"
              className="company-profile-picture"
            />
            <div className="company-profile-info">
              <h1 className="company-profile-name">
                {selfProfileData.company.name}
              </h1>
              <p className="company-profile-bio">
                {selfProfileData.company.bio
                  ? selfProfileData.company.bio
                  : "No bio yet"}
              </p>
              <div className="company-profile-additional-info">
                <div className="company-profile-info-item">
                  <FaMapMarkerAlt />{" "}
                  <span>
                    Location:{" "}
                    {selfProfileData.company.location
                      ? selfProfileData.company.location
                      : "Not specified"}
                  </span>
                </div>
                <div className="company-profile-info-item">
                  <FaUsers />{" "}
                  <span>
                    Employees:{" "}
                    {selfProfileData.company.employees
                      ? selfProfileData.company.employees
                      : "No specified"}
                  </span>
                </div>
                <div className="company-profile-info-item">
                  <FaIndustry />{" "}
                  <span>
                    Industry:{" "}
                    {selfProfileData.company.industry
                      ? selfProfileData.company.industry
                      : "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="company-profile-content">
            <div className="company-profile-section">
              <h2 className="company-profile-section-title">Overview</h2>
              <p
                className="company-profile-section-text"
                dangerouslySetInnerHTML={{
                  __html: selfProfileData.company.overview
                    ? selfProfileData.company.overview
                    : "No yet specified",
                }}
              ></p>
            </div>
            <div className="company-profile-section">
              <h2 className="company-profile-section-title">Services</h2>
              <p
                className="company-profile-section-content"
                dangerouslySetInnerHTML={{
                  __html: selfProfileData.company.services
                    ? selfProfileData.company.services
                    : "No yet specified",
                }}
              ></p>
            </div>
            <div className="company-profile-section">
              <h2 className="company-profile-section-title">
                Contact Information
              </h2>
              <p className="company-profile-section-text">
                <strong>Email:</strong> {selfProfileData.company.email}
              </p>
              <p className="company-profile-section-text">
                <strong>Phone:</strong> {selfProfileData.company.phone}
              </p>
              <p className="company-profile-section-text">
                <strong>Address:</strong>{" "}
                {selfProfileData.company.location
                  ? selfProfileData.company.location
                  : "Not specified"}
              </p>
              <p className="company-profile-section-text">
                <strong>
                  Followed By {selfProfileData.followersCount} people{" "}
                </strong>
              </p>
            </div>
          </div>

          <div className="profile_posts_container">
            <p className="profile_posts_container_title">Jobs</p>
            {isJobsFetched &&
              selfProfileData.companyJobs.map((job, index) => {
                return <ProfileJob key={index} job={job} isOwner={true} />;
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfile;
