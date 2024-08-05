import React from "react";
import Post from "./Post";

const Newsfeed = () => {
  return (
    <div className="newsfeed_container">
      <div className="createPostContainer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
          alt="profilePic"
        />
        <input type="text" name="post" id="post" placeholder="What's new?" />
        <button>Post</button>
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Newsfeed;
