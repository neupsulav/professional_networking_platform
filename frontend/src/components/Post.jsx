import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Post = () => {
  const [seeComments, setSeeComments] = useState(false);
  const [showLikedByModal, setShowLikedByModal] = useState(false);

  return (
    <>
      <div className="postContainer">
        <div className="postIdentity">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt="profile_picture"
          />
          <div className="postIdentity_text">
            <p className="postIdentity_name">
              Sulav Neupane <span className="post_time">. 2d</span>
            </p>
            <p className="postIdentity_field">Full Stack Developer</p>
          </div>
        </div>

        <div className="postContent">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptates eligendi iusto corrupti dolor, nam, quaerat optio nemo
            quis voluptatum aliquid nihil, repellendus quia perferendis alias
            officia iure quos maiores!
          </p>
        </div>
        <div className="post_icons">
          <AiOutlineLike className="post_icons_icon" />
          <FaRegComment className="post_icons_icon" />
          <CiShare2 className="post_icons_icon" />
        </div>

        <div className="commentContainer">
          <div className="likeCommentCount">
            <p
              onClick={() => {
                setShowLikedByModal(true);
              }}
            >
              100 Likes
            </p>
            <p
              onClick={() => {
                setSeeComments(!seeComments);
              }}
            >
              20 Comments
            </p>
          </div>

          <div className="commentInputContainer">
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a comment..."
            />
            <IoSend className="postCommentIcon" />
          </div>
        </div>

        {/* comment section */}
        <div
          className={
            seeComments
              ? "commentsContainer commentVisible"
              : "commentsContainer"
          }
        >
          <p className="commentsContainerTitle">Comments</p>
          <div className="commentItems">
            <div className="commentItem">
              <div>
                <img
                  src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                  alt="profile"
                />
                <div>
                  <p className="commentItem_name">
                    Sandip Neupane <span>2h ago</span>
                  </p>
                  <p className="commentItem_position">Full Stack Developer</p>
                </div>
              </div>
              <div className="commentItem_content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                quaerat ea rerum voluptatum at sit laborum eligendi sequi labore
                ipsum.
              </div>
            </div>
            <div className="commentItem">
              <div>
                <img
                  src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                  alt="profile"
                />
                <div>
                  <p className="commentItem_name">
                    Sandip Neupane <span>2h ago</span>
                  </p>
                  <p className="commentItem_position">Full Stack Developer</p>
                </div>
              </div>
              <div className="commentItem_content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                quaerat ea rerum voluptatum at sit laborum eligendi sequi labore
                ipsum.
              </div>
            </div>
            <div className="commentItem">
              <div>
                <img
                  src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                  alt="profile"
                />
                <div>
                  <p className="commentItem_name">
                    Sandip Neupane <span>2h ago</span>
                  </p>
                  <p className="commentItem_position">Full Stack Developer</p>
                </div>
              </div>
              <div className="commentItem_content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                quaerat ea rerum voluptatum at sit laborum eligendi sequi labore
                ipsum.
              </div>
            </div>
            <div className="commentItem">
              <div>
                <img
                  src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                  alt="profile"
                />
                <div>
                  <p className="commentItem_name">
                    Sandip Neupane <span>2h ago</span>
                  </p>
                  <p className="commentItem_position">Full Stack Developer</p>
                </div>
              </div>
              <div className="commentItem_content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                quaerat ea rerum voluptatum at sit laborum eligendi sequi labore
                ipsum.
              </div>
            </div>
            <div className="commentItem">
              <div>
                <img
                  src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                  alt="profile"
                />
                <div>
                  <p className="commentItem_name">
                    Sandip Neupane <span>2h ago</span>
                  </p>
                  <p className="commentItem_position">Full Stack Developer</p>
                </div>
              </div>
              <div className="commentItem_content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                quaerat ea rerum voluptatum at sit laborum eligendi sequi labore
                ipsum.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* liked by list modal */}
      {showLikedByModal && (
        <div className="overlay">
          <div className="likedBYModalContainer">
            <p className="likedBYModalContainer_title">Liked by</p>
            <RxCross2
              className="closeModalBtn"
              onClick={() => {
                setShowLikedByModal(false);
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

export default Post;
