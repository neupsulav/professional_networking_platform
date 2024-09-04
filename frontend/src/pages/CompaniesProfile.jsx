import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUsers, FaIndustry } from "react-icons/fa";
import Job from "../components/Job";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyProfile = () => {
  // to store company profile data
  const [profileData, setProfileData] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [selfProfileData, setSelfProfileData] = useState();
  const [isJobsFetched, setIsJobsFetched] = useState(false);
  const [isFollowing, setIsFollowing] = useState();

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // get id from url
  const { id } = useParams();

  // to get company profile data
  const getProfileData = async () => {
    const res = await fetch(`/api/getothercompanyprofile/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setProfileData(response);
    setIsDataFetched(true);
    setIsFollowing(response.isFollowing);
  };

  const getSelfProfileData = async () => {
    const res = await fetch("/api/selfuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setSelfProfileData(response);
    if (res.status === 200) {
      setIsJobsFetched(true);
    }
  };

  // to follow a company
  const followCompany = async () => {
    const res = await fetch(`/api/follow/company/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    if (response.msg === "Company followed") {
      // toast.success(`You are now following ${profileData.companyDetails.name}`);
      checkFollowing();
    } else {
      // toast.success(`You have unfollowed ${profileData.companyDetails.name}`);
      checkFollowing();
    }
  };

  // to check if user is following the company
  const checkFollowing = async () => {
    const res = await fetch(`/api/isfollowingcompany/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    if (response === true) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  };

  useEffect(() => {
    getProfileData();
    getSelfProfileData();
  }, [id]);

  return (
    <>
      {isDataFetched && (
        <div className="companies_profile_container">
          <ToastContainer />
          <div className="company-profile-container">
            <div className="company-profile-header">
              <button
                className="follow_btn_company_profile"
                onClick={() => {
                  followCompany();
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
              <img
                src={profileData.companyDetails.image}
                alt="Company Logo"
                className="company-profile-picture"
              />
              <div className="company-profile-info">
                <h1 className="company-profile-name">
                  {profileData.companyDetails.name}
                </h1>
                <p className="company-profile-bio">
                  {profileData.companyDetails.bio
                    ? profileData.companyDetails.bio
                    : "No bio yet"}
                </p>
                <div className="company-profile-additional-info">
                  <div className="company-profile-info-item">
                    <FaMapMarkerAlt />{" "}
                    <span>
                      Location:{" "}
                      {profileData.companyDetails.location
                        ? profileData.companyDetails.location
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="company-profile-info-item">
                    <FaUsers />{" "}
                    <span>
                      Employees:{" "}
                      {profileData.companyDetails.employees
                        ? profileData.companyDetails.employees
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="company-profile-info-item">
                    <FaIndustry />{" "}
                    <span>
                      Industry:{" "}
                      {profileData.companyDetails.industry
                        ? profileData.companyDetails.industry
                        : "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="company-profile-content">
              <div className="company-profile-section">
                <h2 className="company-profile-section-title">Overview</h2>
                <p className="company-profile-section-text">
                  {profileData.companyDetails.overview
                    ? profileData.companyDetails.overview
                    : "Not specified"}
                </p>
              </div>
              <div className="company-profile-section">
                <h2 className="company-profile-section-title">Services</h2>
                <ul className="company-profile-section-list">
                  {profileData.companyDetails.services
                    ? profileData.companyDetails.services
                    : "Not specified"}
                </ul>
              </div>
              <div className="company-profile-section">
                <h2 className="company-profile-section-title">
                  Contact Information
                </h2>
                <p className="company-profile-section-text">
                  <strong>Email:</strong>{" "}
                  {profileData.companyDetails.email
                    ? profileData.companyDetails.email
                    : "Not specified"}
                </p>
                <p className="company-profile-section-text">
                  <strong>Phone:</strong>{" "}
                  {profileData.companyDetails.phone
                    ? profileData.companyDetails.phone
                    : "Not specified"}
                </p>
                <p className="company-profile-section-text">
                  <strong>Address:</strong>{" "}
                  {profileData.companyDetails.location
                    ? profileData.companyDetails.location
                    : "Not specified"}
                </p>
                <p className="company-profile-section-text">
                  <strong>
                    Followed By {profileData.companyDetails.followers.length}{" "}
                    people{" "}
                  </strong>
                </p>
              </div>
            </div>

            <div className="profile_posts_container">
              <p className="profile_posts_container_title">Jobs</p>
              {isJobsFetched &&
                profileData.companyJobs.map((job, index) => {
                  return (
                    <Job
                      key={index}
                      job={job}
                      profileData={selfProfileData}
                      isOwner={false}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfile;
