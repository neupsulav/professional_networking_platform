import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RxLapTimer } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineWorkHistory } from "react-icons/md";
import ApplicantsList from "./ApplicantLists";
import moment from "moment";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Job = ({ job, profileData }) => {
  const [seeJobDetails, setSeeJobDetails] = useState(false);
  const [applyJobModal, setApplyJobModal] = useState(false);
  const [seeApplicants, setSeeApplicants] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to get the formatted date
  const getFormattedDate = (deadline) => {
    const newDate = moment(deadline).format("MMMM D, YYYY");

    setFormattedDate(newDate);
  };

  // for job application form
  const [formData, setFormData] = useState({
    name: profileData.userProfileData.name,
    email: profileData.userProfileData.email,
    phone: profileData.userProfileData.phone
      ? profileData.userProfileData.phone
      : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here

    // to check if user has cv linked oh his/her profile
    // if (!profileData.userProfileData.cv) {
    //   return toast.error(
    //     "Application submission failed. Please link cv to your profile"
    //   );
    // }

    const res = await fetch(`/api/applyjob/${job._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }),
    });

    if (res.status === 201) {
      toast.success("Job applied successfully");
      // setFormData({
      //   name: "",
      //   email: "",
      //   phone: "",
      // });

      // to close the apply job modal
      setApplyJobModal(false);
    } else if (res.status === 404) {
      toast.error(
        "Application submission failed. Please link cv to your profile"
      );
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getFormattedDate(job.deadline);
  }, []);

  return (
    <>
      <div className="job_container">
        <ToastContainer />
        <div className="postIdentity">
          <img src={job.company.image} alt="profile_picture" />
          <div className="postIdentity_text">
            <p className="postIdentity_name">{job.position}</p>
            <p className="postIdentity_field">{job.company.name}</p>
          </div>
        </div>

        <div className="postContent">
          <p>{job.intro}</p>
        </div>

        <div className="job_basic_details">
          <div className="job_details_items">
            <CiLocationOn className="job_details_items_icon_location" />
            <p>{job.location}</p>
          </div>
          <div className="job_details_items">
            <GiTakeMyMoney className="job_details_items_icon_salary" />
            <p>{job.salary}</p>
          </div>
          <div className="job_details_items">
            <RxLapTimer className="job_details_items_icon_deadline" />
            <p>Deadline: {formattedDate}</p>
          </div>
          <div className="job_details_items">
            <MdOutlinePeopleAlt className="job_details_items_icon_people" />
            <p>No of posts: {job.noOfPost}</p>
          </div>
          <div className="job_details_items">
            <MdOutlineWorkHistory className="job_details_items_icon_people" />
            <p>Type: {job.type}</p>
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
            <p dangerouslySetInnerHTML={{ __html: job.requirements }} />
          </div>

          <div className="jobDetails_req">
            <p>Responsibilities</p>
            <p dangerouslySetInnerHTML={{ __html: job.responsibilities }} />
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
