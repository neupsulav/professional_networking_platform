import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdRememberMe } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Post from "../components/Post";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [seeFollowersModal, setSeeFollowersModal] = useState(false);
  const [seeFollowingModal, setSeeFollowingModal] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [profileData, setProfileData] = useState();
  const [formattedDate, setFormattedDate] = useState("");
  const [isFollowing, setIsFollowing] = useState();
  const [seeFollowingCompanies, setSeeFollowingCompanies] = useState(false);

  // to get the formatted date
  const getFormattedDate = (createdAt) => {
    const newDate = moment(createdAt).format("MMMM D, YYYY");

    setFormattedDate(newDate);
  };

  // setting up useParams()
  const { id } = useParams();

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  const navigate = useNavigate();

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  // to get user profile data
  const getProfileData = async () => {
    const res = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    if (res.status === 200) {
      getFormattedDate(response.userProfileData.createdAt);
      setIsDataFetched(true);
      setProfileData(response);
      setIsFollowing(response.isFollowing);
    }
  };

  // to follow and unfollow user
  const followUser = async () => {
    const res = await fetch(`/api/follow/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    if (response.msg === "User followed") {
      toast.success(
        `You are now following ${profileData.userProfileData.name}`
      );
      checkFollowing();
    } else {
      toast.success(`You have unfollowed ${profileData.userProfileData.name}`);
      checkFollowing();
    }
  };

  // to check if we are following the user
  const checkFollowing = async () => {
    const res = await fetch(`/api/checkfollowing/${id}`, {
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
    protectPath();
    getProfileData();
  }, [id]);

  return (
    <>
      {isDataFetched && (
        <div className="users_profile_container">
          <ToastContainer />
          <div className="userProfileContainer">
            <div className="profileDetails">
              {profileData.userProfileData.cv && (
                <button
                  className="viewCv_btn_profile"
                  onClick={() => {
                    window.open(profileData.userProfileData.cv, "_blank");
                  }}
                >
                  View CV
                </button>
              )}
              <button
                className="follow_btn_profile"
                onClick={() => {
                  followUser();
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>

              <img src={profileData.userProfileData.image} alt="user_img" />
              <div className="profileDetailsContent">
                <p className="profile_name">
                  {profileData.userProfileData.name}
                </p>
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
                        : "No location set yet"}
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
                  <div className="skill_item">HTML5</div>
                  <div className="skill_item">CSS3</div>
                  <div className="skill_item">Javascript</div>
                  <div className="skill_item">Python</div>
                  <div className="skill_item">PHP</div>
                  <div className="skill_item">Github</div>
                  <div className="skill_item">SQL</div>
                  <div className="skill_item">React</div>
                </div>
                <div
                  className="following_companies_container"
                  onClick={() => {
                    setSeeFollowingCompanies(true);
                  }}
                >
                  Following{" "}
                  {profileData.userProfileData.following_company.length}{" "}
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
              <p className="profile_posts_container_title">Posts</p>
              {profileData.userPosts.length > 0
                ? profileData.userPosts.map((post, index) => {
                    return <Post key={index} details={post} />;
                  })
                : "No posts yet"}
            </div>
          </div>

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
                            <p className="likedByModalItem_name">{user.name}</p>
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

          {/* for following modal */}
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
                            <p className="likedByModalItem_name">{user.name}</p>
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

          {/* for following companies modal */}
          {seeFollowingCompanies && (
            <div className="overlay">
              <div className="likedBYModalContainer">
                <p className="likedBYModalContainer_title">
                  Following Companies
                </p>
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
                              <p className="likedByModalItem_name">
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
                  : "User haven't followed any company yet"}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
