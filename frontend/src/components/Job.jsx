import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RxLapTimer } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import ApplicantsList from "./ApplicantLists";

const Job = () => {
  const [seeJobDetails, setSeeJobDetails] = useState(false);
  const [applyJobModal, setApplyJobModal] = useState(false);
  const [seeApplicants, setSeeApplicants] = useState(false);

  // for job application form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Handle form submission logic here
  };

  return (
    <>
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
            voluptates eligendi iusto corrupti dolor, nam, quaerat optio nemo
            quis voluptatum aliquid nihil, repellendus quia perferendis alias
            officia iure quos maiores!
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
          <div className="job_details_items">
            <RxLapTimer className="job_details_items_icon_deadline" />
            <p>Deadline: October 10</p>
          </div>
          <div className="job_details_items">
            <MdOutlinePeopleAlt className="job_details_items_icon_people" />
            <p>No of posts: 10</p>
          </div>
        </div>
        <button
          className="see_job_details_btn"
          onClick={() => {
            setSeeJobDetails(!seeJobDetails);
          }}
        >
          {seeJobDetails ? "Hide details" : "See details"}
        </button>

        {/* job apply btn */}
        <button
          className="apply_jobs_btn"
          onClick={() => {
            setApplyJobModal(true);
          }}
        >
          Apply Job
        </button>

        {/* see applicants btn */}
        <button
          className="apply_jobs_btn"
          onClick={() => {
            setSeeApplicants(true);
          }}
        >
          See applicants
        </button>

        {/* for job details */}
        <div
          className={
            seeJobDetails
              ? "jobDetailsContainer jobDetailsVisible"
              : "jobDetailsContainer"
          }
        >
          <p className="jobDetailsContainerHeading">Job Description</p>
          <div className="jobDetails_req">
            <p>Requirements</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
              repellendus deserunt autem exercitationem odio atque nulla, rerum
              error, temporibus illo possimus et excepturi! Ut tenetur libero
              quo cupiditate quas neque.
            </p>
          </div>

          <div className="jobDetails_req">
            <p>Responsibilities</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              perspiciatis, quae sapiente molestiae cupiditate autem amet
              voluptatibus unde a voluptas dignissimos, dolor repellendus ipsum
              quo dolorem odit vitae. Veniam, pariatur?
            </p>
          </div>
        </div>
      </div>

      {/* apply job modal */}
      {applyJobModal && (
        <div className="overlay">
          {/* <div className="likedBYModalContainer"> */}
          <RxCross2
            className="closeModalBtn"
            onClick={() => {
              setApplyJobModal(false);
            }}
          />

          <div className="job-application-form-container">
            <form className="job-application-form" onSubmit={handleSubmit}>
              <h1 className="job-application-form-title">
                Job Application Form
              </h1>
              <div className="job-application-form-group">
                <label htmlFor="name" className="job-application-form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="job-application-form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="job-application-form-group">
                <label htmlFor="email" className="job-application-form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="job-application-form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="job-application-form-group">
                <label htmlFor="phone" className="job-application-form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="job-application-form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="job-application-form-submit">
                Submit Details
              </button>
              <p className="job-application-form-note">
                The CV linked on your profile will be automatically included in
                your job application and can be viewed by the respective
                company.
              </p>
            </form>
          </div>
          {/* </div> */}
        </div>
      )}

      {/* see applicants modal */}
      {seeApplicants && (
        <div className="overlay">
          <RxCross2
            className="closeModalBtn"
            onClick={() => {
              setSeeApplicants(false);
            }}
          />
          <ApplicantsList />
        </div>
      )}
    </>
  );
};

export default Job;
