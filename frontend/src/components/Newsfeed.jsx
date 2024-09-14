/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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

  // to store posts for newsfeed
  const [posts, setPosts] = useState([]);

  // to update caption value
  const handleInputs = async (e) => {
    const value = e.target.value;
    setCaption(value);
  };

  // to store user profile data
  const [profileData, setProfileData] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

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

  const getPosts = async () => {
    const res = await fetch("/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setPosts(response);
  };

  useEffect(() => {
    getPosts();
    getProfileData();
  }, []);

  return (
    <>
      {isDataFetched && (
        <div className="newsfeed_container">
          <ToastContainer />
          <div className="createPostContainer">
            <img src={profileData.userProfileData.image} alt="profilePic" />
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

          {/* to display all the posts */}
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return <Post key={index} details={post} />;
            })
          ) : (
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              No posts yet. Please follow people to create network and view
              posts.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Newsfeed;
