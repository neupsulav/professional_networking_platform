/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import Cookies from "universal-cookie";

const NotificationPage = () => {
  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to store notifications
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    const res = await fetch("/api/notifications", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setNotifications(response);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      <div className="notifications-list">
        {notifications.map((notification, index) => (
          <NotificationItem key={index} details={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
