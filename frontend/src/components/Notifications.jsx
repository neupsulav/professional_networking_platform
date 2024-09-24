/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import Cookies from "universal-cookie";
import CompanyNotificationItem from "./CompanyNotificationItem";

const NotificationPage = () => {
  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");
  const userType = cookies.get("accounttype");

  // to check if data is fetched
  const [isDataFetched, setIsDataFetched] = useState(false);

  // to store user notifications
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
    setIsDataFetched(true);
  };

  // to store company notifications
  const [companyNotifications, setCompanyNotifications] = useState([]);

  const getCompanyNotifications = async () => {
    const res = await fetch("/api/getcompanynotifications", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setCompanyNotifications(response);
    setIsDataFetched(true);
  };

  useEffect(() => {
    // getNotifications();
    const cookies = new Cookies();
    const userType = cookies.get("accounttype");

    if (userType === "user") {
      getNotifications();
    } else {
      getCompanyNotifications();
    }
  }, []);

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      {isDataFetched && (
        <div className="notifications-list">
          {notifications &&
            notifications.map((notification, index) => (
              <NotificationItem key={index} details={notification} />
            ))}

          {companyNotifications &&
            companyNotifications.map((notification, index) => (
              <CompanyNotificationItem key={index} details={notification} />
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
