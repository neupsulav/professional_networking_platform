import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const CompanyNotificationItem = ({ details }) => {
  //   const navigate = useNavigate();

  //   to store difference in days
  const [time, setTime] = useState();

  // to calculate days for notifications
  const calculateDaysSince = (createdAtDate) => {
    // Calculate the difference in milliseconds
    const currentDate = new Date();
    const createdDate = new Date(createdAtDate);
    const differenceInMilliseconds = currentDate - createdDate;

    // Convert milliseconds to days
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    // return differenceInDays;
    setTime(differenceInDays);
  };

  useState(() => {
    calculateDaysSince(details.createdAt);
  }, []);

  return (
    <div
      className="notification-item-container"
      //   onClick={() => navigate(`/post/${details.post}`)}
    >
      <div className="notification-avatar">
        <img src={details.currentUser.image} alt={`${details.user}'s img`} />
      </div>
      <div className="notification-content">
        <p className="notification-message">{details.content}</p>
        <span className="notification-time">{time} days ago</span>
      </div>
    </div>
  );
};

export default CompanyNotificationItem;
