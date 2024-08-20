/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const Post = ({ details }) => {
  const [seeComments, setSeeComments] = useState(false);
  const [showLikedByModal, setShowLikedByModal] = useState(false);
  const [likesCount, setLikesCount] = useState(details.likes.length);
  const [isLiked, setIsLiked] = useState();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(details.comments.length);
  const [likedBy, setLikedBy] = useState(details.likes);

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // for number of days
  const [daysSince, setDaysSince] = useState(3);

  const calculateDaysSince = () => {
    // Calculate the difference in milliseconds
    const currentDate = new Date();
    const createdDate = new Date(details.createdAt);
    const differenceInMilliseconds = currentDate - createdDate;

    // Convert milliseconds to days
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    // Update the state
    setDaysSince(differenceInDays);
    return daysSince;
  };

  // to calculate days for comments
  const calculateDaysSinceComment = (createdAtDate) => {
    // Calculate the difference in milliseconds
    const currentDate = new Date();
    const createdDate = new Date(createdAtDate);
    const differenceInMilliseconds = currentDate - createdDate;

    // Convert milliseconds to days
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  };

  // to handle comment value
  const handleInputs = async (e) => {
    const value = e.target.value;
    setComment(value);
  };

  // for liking post
  const likePost = async (id) => {
    await fetch(`/api/likepost/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  };

  // for getting likes count
  const getLikesCount = async (id) => {
    const res = await fetch(`/api/getlikescount/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setLikesCount(response.likesCount);
    setIsLiked(response.isLiked);
    setLikedBy(response.likedBy.likes);
  };

  // for posting a comment
  const postComment = async (id) => {
    const res = await fetch(`/api/createcomment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        content: comment,
      }),
    });

    if (res.status === 201) {
      toast.success("Commented created");
      setComment("");
      getComments(details._id);
    } else {
      toast.error("Something went wrong");
    }
  };

  // for getting comments and comments count
  const getComments = async (id) => {
    const res = await fetch(`/api/getcomments/${id}`, {
      method: "GET",
    });

    const response = await res.json();
    setComments(response.Comments.comments);
    setCommentsCount(response.commentsCount);
  };

  useEffect(() => {
    calculateDaysSince();
    getLikesCount(details._id);
    getComments(details._id);
  }, []);

  return (
    <>
      <div className="postContainer">
        <div className="postIdentity">
          <img src={details.user.image} alt="profile_picture" />
          <div className="postIdentity_text">
            <p className="postIdentity_name">
              {details.user.name}
              <span className="post_time">
                {daysSince === 0 ? "Today" : `.${daysSince}d`}
              </span>
            </p>
            <p className="postIdentity_field">
              {details.user.position
                ? details.user.position
                : details.user.email}
            </p>
          </div>
        </div>

        <div className="postContent">
          <p>{details.caption}</p>
        </div>
        <div className="post_icons">
          <AiOutlineLike
            className={isLiked ? "post_icons_icon_liked" : "post_icons_icon"}
            onClick={() => {
              likePost(details._id).then(() => {
                getLikesCount(details._id);
              });
            }}
          />
          <FaRegComment className="post_icons_icon" />
          <CiShare2
            className="post_icons_icon"
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3001/post/${details._id}`
              );
              toast.success("Link copied to clipboard");
            }}
          />
        </div>

        <div className="commentContainer">
          <div className="likeCommentCount">
            <p
              onClick={() => {
                setShowLikedByModal(true);
              }}
            >
              {likesCount} Likes
            </p>
            <p
              onClick={() => {
                setSeeComments(!seeComments);
              }}
            >
              {seeComments ? "Hide Comments" : `${commentsCount} Comments`}
            </p>
          </div>

          <div className="commentInputContainer">
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a comment..."
              className="commentInputContainer_input"
              value={comment}
              onChange={handleInputs}
            />
            <IoSend
              className="postCommentIcon"
              onClick={() => {
                postComment(details._id);
              }}
            />
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
            {comments.length > 0
              ? comments.map((comment, index) => {
                  return (
                    <div className="commentItem" key={index}>
                      <div>
                        <img src={comment.user.image} alt="profile" />
                        <div>
                          <p className="commentItem_name">
                            {comment.user.name}{" "}
                            <span>
                              {calculateDaysSinceComment(comment.createdAt)}d
                              ago
                            </span>
                          </p>
                          <p className="commentItem_position">
                            {comment.user.position
                              ? comment.user.position
                              : comment.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="commentItem_content">
                        {comment.content}
                      </div>
                    </div>
                  );
                })
              : "No comments yet"}
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
            {likedBy.length > 0
              ? likedBy.map((person, index) => {
                  return (
                    <div className="likedBYModalItems" key={index}>
                      <img src={person.image} alt="profile" />
                      <div>
                        <p className="likedByModalItem_name">{person.name}</p>
                        <p className="likedByModal_position">
                          {person.position ? person.position : person.email}
                        </p>
                      </div>
                    </div>
                  );
                })
              : "No likes yet"}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
