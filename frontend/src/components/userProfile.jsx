/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdRememberMe } from "react-icons/md";
import Post from "./Post";
import { RxCross2 } from "react-icons/rx";
import Cookies from "universal-cookie";
import moment from "moment";

const UserProfile = () => {
  const [seeFollowersModal, setSeeFollowersModal] = useState(false);
  const [seeFollowingModal, setSeeFollowingModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

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

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      {isDataFetched && (
        <div className="userProfileContainer">
          <div className="profileDetails">
            <img
              src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
              alt="user_img"
            />
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
                {profileData.userProfileData.skills &&
                  profileData.userProfileData.skills.map((skill) => {
                    return <div className="skill_item">{skill}</div>;
                  })}
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
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
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
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
            <div className="likedBYModalItems">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                alt="profile"
              />
              <div>
                <p className="likedByModalItem_name">Sulav Neupane</p>
                <p className="likedByModal_position">Full stack developer</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
