import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";

const Job = () => {
  return (
    <div className="job_container">
      <div className="postIdentity">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
          alt="profile_picture"
        />
        <div className="postIdentity_text">
          <p className="postIdentity_name">Senior Backend Developer</p>
          <p className="postIdentity_field">XYZ company</p>
        </div>
      </div>

      <div className="postContent">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
          voluptates eligendi iusto corrupti dolor, nam, quaerat optio nemo quis
          voluptatum aliquid nihil, repellendus quia perferendis alias officia
          iure quos maiores!
        </p>
      </div>

      <div className="job_basic_details">
        <div className="job_details_items">
          <CiLocationOn className="job_details_items_icon_location" />
          <p>Butwal</p>
        </div>
        <div className="job_details_items">
          <GiTakeMyMoney className="job_details_items_icon_salary" />
          <p>Rs 20000</p>
        </div>
      </div>
      <button className="see_job_details_btn">See details...</button>
    </div>
  );
};

export default Job;
