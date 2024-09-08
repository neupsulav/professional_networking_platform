/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdRememberMe } from "react-icons/md";
import Post from "./Post";
import { RxCross2 } from "react-icons/rx";
import Cookies from "universal-cookie";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Job from "./Job";

const UserProfile = () => {
  // to navigate to user profile
  const navigate = useNavigate();

  const [seeFollowersModal, setSeeFollowersModal] = useState(false);
  const [seeFollowingModal, setSeeFollowingModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [seeFollowingCompanies, setSeeFollowingCompanies] = useState(false);
  const [seepost, setSeePost] = useState(true);
  const [seeAppliedJobs, setSeeAppliedJobs] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState();

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to get the formatted date
  const getFormattedDate = (createdAt) => {
    const newDate = moment(createdAt).format("MMMM D, YYYY");

    setFormattedDate(newDate);
  };

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
    setIsDataFetched(true);
    getFormattedDate(response.userProfileData.createdAt);
  };

  // to get applied jobs
  const getAppliedJobs = async () => {
    const res = await fetch("/api/getappliedjobs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setAppliedJobs(response);
  };

  useEffect(() => {
    getProfileData();
    getAppliedJobs();
  }, []);

  return (
    <>
      {isDataFetched && (
        <div className="userProfileContainer">
          <div className="profileDetails">
            {profileData.userProfileData.cv && (
              <button
                className="viewCv_btn_selfprofile"
                onClick={() => {
                  window.open(profileData.userProfileData.cv, "_blank");
                }}
              >
                View CV
              </button>
            )}
            <img src={profileData.userProfileData.image} alt="user_img" />
            <div className="profileDetailsContent">
              <p className="profile_name">{profileData.userProfileData.name}</p>
              <p className="profile_position">
                {profileData.userProfileData.position
                  ? profileData.userProfileData.position
                  : profileData.userProfileData.email}
              </p>
              <div className="profileDetails_icon_container">
                <div>
                  <FaLocationDot className="profileDetails_icons_location" />
                  <p>
                    {profileData.userProfileData.location
                      ? profileData.userProfileData.location
                      : "No location yet"}
                  </p>
                </div>

                <div>
                  <MdRememberMe className="profileDetails_icons_member" />
                  <p>{`Member since ${formattedDate}`}</p>
                </div>
              </div>
              <div className="profile_bio">
                {profileData.userProfileData.bio
                  ? profileData.userProfileData.bio
                  : "No bio yet"}
              </div>

              <div className="profile_skills">
                {/* {
                  profileData.userProfileData.skills &&
                    JSON.parse(profileData.userProfileData.skills[0]).map(
                      (skill, index) => {
                        return (
                          <div key={index} className="skill_item">
                            {skill}
                          </div>
                        );
                      }
                    )
                  // profileData.userProfileData.skills[0].split(", ")
                } */}
              </div>
              <div
                className="following_companies_container"
                onClick={() => {
                  setSeeFollowingCompanies(true);
                }}
              >
                Following {profileData.userProfileData.following_company.length}{" "}
                companies
              </div>
            </div>
          </div>
          <div className="follwing_followers_count">
            <div
              onClick={() => {
                setSeeFollowingModal(true);
              }}
            >
              <p className="follwing_followers_count_number">
                {profileData.followingCount}
              </p>
              <p>Following</p>
            </div>

            <div
              onClick={() => {
                setSeeFollowersModal(true);
              }}
            >
              <p className="follwing_followers_count_number">
                {profileData.followersCount}
              </p>
              <p>Followers</p>
            </div>
          </div>

          <div className="profile_posts_container">
            {/* <p className="profile_posts_container_title">Posts</p> */}

            <div className="profile_posts_container_btns">
              <button
                className={
                  seepost
                    ? "profile_posts_container_btns_active"
                    : "profile_posts_container_buttons"
                }
                onClick={() => {
                  setSeePost(true);
                  setSeeAppliedJobs(false);
                }}
              >
                Post
              </button>
              <button
                className={
                  seeAppliedJobs
                    ? "profile_posts_container_btns_active"
                    : "profile_posts_container_buttons"
                }
                onClick={() => {
                  setSeePost(false);
                  setSeeAppliedJobs(true);
                }}
              >
                Applied Jobs
              </button>
            </div>
            {seepost &&
              (profileData.userPosts.length > 0
                ? profileData.userPosts.map((post, index) => {
                    return <Post key={index} details={post} />;
                  })
                : "No posts yet")}

            {!seepost &&
              (appliedJobs.length > 0
                ? appliedJobs
                    .slice()
                    .reverse()
                    .map((job, index) => {
                      return (
                        <Job
                          key={index}
                          job={job.job}
                          profileData={profileData}
                          isOwner={false}
                        />
                      );
                    })
                : "No jobs applied yet")}
          </div>
        </div>
      )}

      {/* for followers modal */}
      {seeFollowersModal && (
        <div className="overlay">
          <div className="likedBYModalContainer">
            <p className="likedBYModalContainer_title">Followers</p>
            <RxCross2
              className="closeModalBtn"
              onClick={() => {
                setSeeFollowersModal(false);
              }}
            />
            {profileData.userProfileData.followers.length > 0
              ? profileData.userProfileData.followers.map((user, index) => {
                  return (
                    <div key={index} className="likedBYModalItems">
                      <img src={user.image} alt="profile" />
                      <div>
                        <p
                          className="likedByModalItem_name"
                          onClick={() => {
                            navigate(`/user/${user._id}`);
                          }}
                        >
                          {user.name}
                        </p>
                        <p className="likedByModal_position">
                          {user.position ? user.position : user.email}
                        </p>
                      </div>
                    </div>
                  );
                })
              : "You have no followers yet"}
          </div>
        </div>
      )}

      {/* for followers modal */}
      {seeFollowingModal && (
        <div className="overlay">
          <div className="likedBYModalContainer">
            <p className="likedBYModalContainer_title">Following</p>
            <RxCross2
              className="closeModalBtn"
              onClick={() => {
                setSeeFollowingModal(false);
              }}
            />
            {profileData.userProfileData.following.length > 0
              ? profileData.userProfileData.following.map((user, index) => {
                  return (
                    <div key={index} className="likedBYModalItems">
                      <img src={user.image} alt="profile" />
                      <div>
                        <p
                          className="likedByModalItem_name"
                          onClick={() => {
                            navigate(`/user/${user._id}`);
                          }}
                        >
                          {user.name}
                        </p>
                        <p className="likedByModal_position">
                          {user.position ? user.position : user.email}
                        </p>
                      </div>
                    </div>
                  );
                })
              : "You are currently following no any users"}
          </div>
        </div>
      )}

      {/* following companies modal */}
      {seeFollowingCompanies && (
        <div className="overlay">
          <div className="likedBYModalContainer">
            <p className="likedBYModalContainer_title">Following Companies</p>
            <RxCross2
              className="closeModalBtn"
              onClick={() => {
                setSeeFollowingCompanies(false);
              }}
            />
            {profileData.userProfileData.following_company.length > 0
              ? profileData.userProfileData.following_company.map(
                  (company, index) => {
                    return (
                      <div key={index} className="likedBYModalItems">
                        <img src={company.image} alt="profile" />
                        <div>
                          <p
                            className="likedByModalItem_name"
                            onClick={() => {
                              navigate(`/company/${company._id}`);
                            }}
                          >
                            {company.name}
                          </p>
                          <p className="likedByModal_position">
                            {company.industry
                              ? company.industry
                              : company.email}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )
              : "You haven't followed any company yet"}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
