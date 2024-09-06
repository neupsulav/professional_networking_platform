import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const SuggestionBar = () => {
  // to navigate to user profile
  const navigate = useNavigate();

  // to store recommended people data
  const [people, setPeople] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);

  // to access cookies data
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  // to get people recommendations data
  const getPeopleData = async () => {
    const res = await fetch("/api/peoplerecommendations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setPeople(response);
    setIsDataFetched(true);
  };

  useEffect(() => {
    getPeopleData();
  }, []);

  return (
    <>
      {isDataFetched && (
        <div className="suggestionbar_container">
          <p className="suggestionbar_heading">People you may know</p>
          <div className="suggestionbar_items">
            {people.length > 0
              ? people.map((data, index) => {
                  return (
                    <div key={index} className="suggestionbar_item">
                      <div className="suggestionbar_recommended_people">
                        <img
                          className="suggestionbar_item_img"
                          src={data.recommendedUser.image}
                          alt="profile"
                        />
                        <div>
                          <p
                            className="suggestionbar_item_name"
                            onClick={() => {
                              navigate(`/user/${data.recommendedUser._id}`);
                            }}
                          >
                            {data.recommendedUser.name}
                          </p>
                          <p className="suggestionbar_item_position">
                            {data.recommendedUser.email}
                          </p>
                        </div>
                      </div>

                      {/* recommended by container */}
                      <div className="recommended_by_container">
                        Recommended through:
                        <div>
                          <img
                            className="recommended_by_person_image"
                            src={data.recommendedBy.image}
                            alt="recommended by person"
                          />
                          <p
                            className="recommended_by_person_name"
                            onClick={() => {
                              navigate(`/user/${data.recommendedBy._id}`);
                            }}
                          >
                            {data.recommendedBy.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No recommendations yet"}
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestionBar;
