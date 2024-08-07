import React from "react";

const NotificationItem = ({ notification }) => {
  const { type, user, post } = notification;

  const getMessage = () => {
    switch (type) {
      case "like":
        return `${user} liked ${post}`;
      case "comment":
        return `${user} commented on ${post}`;
      default:
        return "";
    }
  };

  return (
    <div className="notification-item">
      <p>{getMessage()}</p>
    </div>
  );
};

export default NotificationItem;
