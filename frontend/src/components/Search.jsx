import React, { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { PiLineVertical } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(true);
  const [searchTerm, setSearchTerm] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);

  //   to store search result
  const [searchResult, setSearchResult] = useState();

  // to update search value
  const handleInputs = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  //   to get search result
  const getSearchResult = async () => {
    const res = await fetch(`/api/search?query=${searchTerm}`, {
      method: "GET",
    });

    const response = await res.json();
    setSearchResult(response);
    setIsDataFetched(true);
  };

  return (
    <>
      <div className="search_page_container">
        <p className="search_page_title">Search</p>

        <div className="search_bar_container">
          <input
            className="search_page_bar"
            type="text"
            placeholder="Search people and companies here"
            onChange={handleInputs}
          />
          <GrSearch
            className="search_page_icon"
            onClick={() => {
              getSearchResult();
            }}
          />
        </div>

        {isDataFetched && (
          <div className="search_result_main_container">
            <div className="search_result_container_title">
              <p
                className="search_result_people"
                style={{ color: selectedOption ? "#5bb7a8" : "initial" }}
                onClick={() => {
                  setSelectedOption(true);
                }}
              >
                People
              </p>
              <PiLineVertical className="search_result_title_icon" />
              <p
                className="search_result_company"
                style={{ color: !selectedOption ? "#5bb7a8" : "initial" }}
                onClick={() => {
                  setSelectedOption(false);
                }}
              >
                Company
              </p>
            </div>

            {selectedOption && (
              <div className="people_result_container">
                {searchResult.users.length > 0
                  ? searchResult.users.map((user, index) => {
                      return (
                        <div
                          key={index}
                          className="suggestionbar_item_company_search"
                        >
                          <img src={user.image} alt="profile" />
                          <div>
                            <p
                              className="suggestionbar_item_name"
                              onClick={() => {
                                navigate(`/user/${user._id}`);
                              }}
                            >
                              {user.name}
                            </p>
                            <p className="suggestionbar_item_position">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : "No users found"}
              </div>
            )}

            {!selectedOption && (
              <div className="company_result_container">
                {searchResult.companies.length > 0
                  ? searchResult.companies.map((company, index) => {
                      return (
                        <div
                          key={index}
                          className="suggestionbar_item_company_search"
                        >
                          <img src={company.image} alt="profile" />
                          <div>
                            <p
                              className="suggestionbar_item_name"
                              onClick={() => {
                                navigate(`/company/${company._id}`);
                              }}
                            >
                              {company.name}
                            </p>
                            <p className="suggestionbar_item_position">
                              {company.email}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : "No companies found"}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
