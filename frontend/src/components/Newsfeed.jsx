import React, { useState } from "react";
import Post from "./Post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const Newsfeed = () => {
  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to store post caption
  const [caption, setCaption] = useState("");

  // to update caption value
  const handleInputs = async (e) => {
    const value = e.target.value;
    setCaption(value);
  };

  // to create a new post
  const postData = async (e) => {
    e.preventDefault();

    if (caption.length === 0) {
      toast.error("Please write a caption to post");
    } else {
      const res = await fetch("/api/createpost/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          caption: caption,
        }),
      });

      if (res.status === 201) {
        toast.success("Your post is created");
      } else {
        toast.error("Something went wrong!");
      }

      setCaption("");
    }
  };

  return (
    <div className="newsfeed_container">
      <ToastContainer />
      <div className="createPostContainer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
          alt="profilePic"
        />
        <input
          type="text"
          name="post"
          id="post"
          placeholder="What's new?"
          value={caption}
          onChange={handleInputs}
        />
        <button onClick={postData}>Post</button>
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
