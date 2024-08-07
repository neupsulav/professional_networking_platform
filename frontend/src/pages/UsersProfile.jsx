import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdRememberMe } from "react-icons/md";

import { RxCross2 } from "react-icons/rx";
import Post from "../components/Post";

const UserProfile = () => {
  const [seeFollowersModal, setSeeFollowersModal] = useState(false);
  const [seeFollowingModal, setSeeFollowingModal] = useState(false);

  return (
    <>
      <div className="users_profile_container">
        <div className="userProfileContainer">
          <div className="profileDetails">
            <button className="follow_btn_profile">Follow</button>
            <img
              src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
              alt="user_img"
            />
            <div className="profileDetailsContent">
              <p className="profile_name">Sulav Neupane</p>
              <p className="profile_position">Full Stack Developer</p>
              <div className="profileDetails_icon_container">
                <div>
                  <FaLocationDot className="profileDetails_icons_location" />
                  <p>Butwal</p>
                </div>

                <div>
                  <MdRememberMe className="profileDetails_icons_member" />
                  <p>Member since June 7, 2020</p>
                </div>
              </div>
              <div className="profile_bio">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus dignissimos porro fugiat accusantium praesentium maxime
                laboriosam dolor illum, quod amet mollitia tempore inventore
                nisi. Molestias perferendis quasi numquam accusantium alias.
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
            </div>
          </div>
          <div className="follwing_followers_count">
            <div
              onClick={() => {
                setSeeFollowingModal(true);
              }}
            >
              <p className="follwing_followers_count_number">100</p>
              <p>Following</p>
            </div>

            <div
              onClick={() => {
                setSeeFollowersModal(true);
              }}
            >
              <p className="follwing_followers_count_number">100</p>
              <p>Followers</p>
            </div>
          </div>

          <div className="profile_posts_container">
            <p className="profile_posts_container_title">Posts</p>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
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
      </div>
    </>
  );
};

export default UserProfile;
