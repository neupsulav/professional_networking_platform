import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { IoSend } from "react-icons/io5";

const Post = () => {
  return (
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
          voluptates eligendi iusto corrupti dolor, nam, quaerat optio nemo quis
          voluptatum aliquid nihil, repellendus quia perferendis alias officia
          iure quos maiores!
        </p>
      </div>
      <div className="post_icons">
        <AiOutlineLike className="post_icons_icon" />
        <FaRegComment className="post_icons_icon" />
        <CiShare2 className="post_icons_icon" />
      </div>

      <div className="commentContainer">
        <div className="likeCommentCount">
          <p>100 Likes</p>
          <p>20 Comments</p>
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
    </div>
  );
};

export default Post;
