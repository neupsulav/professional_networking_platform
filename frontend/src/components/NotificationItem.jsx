import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({ details }) => {
  const navigate = useNavigate();
  // const { type, user, post } = notification;

  // const getMessage = () => {
  //   switch (type) {
  //     case "like":
  //       return `${user} liked ${post}`;
  //     case "comment":
  //       return `${user} commented on ${post}`;
  //     default:
  //       return "";
  //   }
  // };

  return (
    <div
      className="notification-item"
      onClick={() => {
        navigate(`/post/${details.post}`);
      }}
    >
      <p>{details.content}</p>
    </div>
  );
};

export default NotificationItem;
