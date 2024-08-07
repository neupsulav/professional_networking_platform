import React from "react";
import NotificationItem from "./NotificationItem";

const notifications = [
  { id: 1, type: "like", user: "Saurav Bhusal", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
  { id: 2, type: "comment", user: "Sandip Neupane", post: "Your post" },
];

const NotificationPage = () => {
  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
