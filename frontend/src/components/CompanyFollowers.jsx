import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const CompanyFollowers = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");

  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to store followers data
  const [followers, setFollowers] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);

  // to get followers data
  const getFollowers = async () => {
    const res = await fetch("api/getcompanyselfprofile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    if (response.company) {
      setFollowers(response.company.followers);
      setIsDataFetched(true);
    }
  };

  useState(() => {
    getFollowers();
  }, []);

  return (
    <div className="suggestionbar_container">
      <p className="suggestionbar_heading">Followers</p>
      <div className="suggestionbar_items">
        {isDataFetched &&
          followers.length > 0 &&
          followers.map((follower, index) => {
            return (
              <div key={index} className="suggestionbar_item_company">
                <img src={follower.image} alt="profile" />
                <div>
                  <p
                    className="suggestionbar_item_name"
                    onClick={() => {
                      navigate(`/user/${follower._id}`);
                    }}
                  >
                    {follower.name}
                  </p>
                  <p className="suggestionbar_item_position">
                    {follower.email}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CompanyFollowers;
