import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({ details }) => {
  const navigate = useNavigate();

  return (
    <div
      className="notification-item-container"
      onClick={() => navigate(`/post/${details.post}`)}
    >
      <div className="notification-avatar">
        <img src={details.user.image} alt={`${details.user}'s img`} />
      </div>
      <div className="notification-content">
        <p className="notification-message">{details.content}</p>
        <span className="notification-time">{details.time}</span>
      </div>
    </div>
  );
};

export default NotificationItem;
