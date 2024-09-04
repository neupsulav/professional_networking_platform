import React, { useEffect, useState } from "react";
import Job from "./Job";
import Cookies from "universal-cookie";

const Jobs = () => {
  const [isJobsFetched, setIsJobsFetched] = useState(false);
  const [jobsArray, setJobsArray] = useState([]);

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to get jobs
  const getJobs = async () => {
    const res = await fetch("/api/getjobs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setJobsArray(response);
  };

  // to store user profile data
  const [profileData, setProfileData] = useState({});

  // to get user's profile data
  const getProfileData = async () => {
    const res = await fetch("/api/selfuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setProfileData(response);
    if (res.status === 200) {
      setIsJobsFetched(true);
    }
  };

  useEffect(() => {
    getJobs();
    getProfileData();
  }, []);

  return (
    <div className="jobs_container">
      {isJobsFetched &&
        jobsArray.map((job, index) => {
          return (
            <Job
              key={index}
              job={job}
              profileData={profileData}
              isOwner={false}
            />
          );
        })}

      {isJobsFetched &&
        jobsArray.length === 0 &&
        "No jobs to show. Please follow some companies"}
    </div>
  );
};

export default Jobs;
