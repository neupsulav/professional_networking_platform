/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Newsfeed from "../components/Newsfeed";
import SuggestionBar from "../components/SuggestionBar";
import Jobs from "../components/Jobs";
import Notifications from "../components/Notifications";
// import CompanyProfile from "../components/CompanyProfile";
import UserProfile from "../components/userProfile";
import { RxHamburgerMenu } from "react-icons/rx";
import CompanyProfile from "../components/CompanyProfile";
// import UserProfile from "../components/userProfile";
import Settings from "../components/settings";
import Cookies from "universal-cookie";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();

  const [selectedPath, setSelectedPath] = useState(0);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  // for accountType cookie value
  const [cookieValueAccType, setCookieValueAccType] = useState("");

  // for cookies
  const cookies = new Cookies();
  useEffect(() => {
    const value = cookies.get("accounttype");
    setCookieValueAccType(value || "No cookie found");
  }, []);

  console.log(cookieValueAccType);

  // const cookieToken = cookies.get("jwttoken");

  // const protectPath = () => {
  //   if (!cookieToken) {
  //     navigate("/login");
  //   }
  // };

  //   to navigate using sidebar options
  const navigateComponents = () => {
    switch (selectedPath) {
      case 0:
        return <Newsfeed />;
      case 1:
        // return <CompanyProfile />;
        return <UserProfile />;
      // return <CompanyProfile />;
      // return <UserProfile />;
      case 2:
        return <Jobs />;
      case 4:
        return <Notifications />;
      case 5:
        return <Settings />;

      default:
        break;
    }
  };

  return (
    <div className="pageContainer">
      {!isSidebarActive && (
        <RxHamburgerMenu
          className="hamburger_icon"
          onClick={() => {
            setIsSidebarActive(true);
          }}
        />
      )}
      <Sidebar
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
      />
      {navigateComponents(selectedPath)}
      <SuggestionBar />
    </div>
  );
};

export default Home;
