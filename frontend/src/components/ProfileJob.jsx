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

const ProfileJob = ({ job, profileData, isOwner }) => {
  const [seeJobDetails, setSeeJobDetails] = useState(false);
  const [seeApplicants, setSeeApplicants] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  //   to store applicants data
  const [applicants, setApplicants] = useState();

  // to get the formatted date
  const getFormattedDate = (deadline) => {
    const newDate = moment(deadline).format("MMMM D, YYYY");

    setFormattedDate(newDate);
  };

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  //   to get job applicants list
  const getApplicants = async () => {
    const res = await fetch(`/api/getapplicants/${job._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    if (res.status === 200) {
      setApplicants(response);
    }
  };

  useEffect(() => {
    getFormattedDate(job.deadline);
    getApplicants();
  }, []);

  return (
    <>
      <div className="job_container">
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
            <p>{job.location ? job.location : "Not specified"}</p>
          </div>
          <div className="job_details_items">
            <GiTakeMyMoney className="job_details_items_icon_salary" />
            <p>{job.salary ? job.salary : "Not specified"}</p>
          </div>
          <div className="job_details_items">
            <RxLapTimer className="job_details_items_icon_deadline" />
            <p>Deadline: {formattedDate}</p>
          </div>
          <div className="job_details_items">
            <MdOutlinePeopleAlt className="job_details_items_icon_people" />
            <p>No of posts: {job.noOfPost ? job.noOfPost : "Not specified"}</p>
          </div>
          <div className="job_details_items">
            <MdOutlineWorkHistory className="job_details_items_icon_people" />
            <p>Type: {job.type ? job.type : "Not specified"}</p>
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

        {/* see applicants btn */}
        {isOwner && (
          <button
            className="apply_jobs_btn"
            onClick={() => {
              setSeeApplicants(true);
            }}
          >
            See applicants
          </button>
        )}

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

      {/* see applicants modal */}
      {seeApplicants && (
        <div className="overlay">
          <RxCross2
            className="closeModalBtn"
            onClick={() => {
              setSeeApplicants(false);
            }}
          />
          <ApplicantsList applicants={applicants} />
        </div>
      )}
    </>
  );
};

export default ProfileJob;
