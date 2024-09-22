import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Job from "./Job";

const RecommendationPage = () => {
  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  //   to store recommended jobs
  const [recommendedJobs, setRecommendedJobs] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);

  //   to get the recommended jobs
  const getRecommendedJobs = async () => {
    const res = await fetch("/api/getjobrecommendations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setRecommendedJobs(response);
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
    setIsDataFetched(true);
  };

  useEffect(() => {
    getRecommendedJobs();
    getProfileData();
  }, []);

  return (
    <>
      {isDataFetched && (
        <div className="recommendation_page_container">
          <p className="recommendation_page_title">Recommended Jobs</p>

          <div className="recommended_jobs_container">
            {recommendedJobs.map((job, index) => {
              return (
                <Job
                  key={index}
                  job={job}
                  profileData={profileData}
                  isOwner={false}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationPage;
