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
import CompanyFollowers from "../components/CompanyFollowers";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();

  const [selectedPath, setSelectedPath] = useState(0);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const cookies = new Cookies();
    const cookie = cookies.get("accounttype");
    setUserType(cookie);

    // for initial path setup for company
    if (cookie === "user") {
      setSelectedPath(0);
    } else {
      setSelectedPath(1);
    }
  }, []);

  //   to navigate using sidebar options
  const navigateComponents = () => {
    switch (selectedPath) {
      case 0:
        return <Newsfeed />;
      case 1:
        return userType === "user" ? <UserProfile /> : <CompanyProfile />;

      case 2:
        return <Jobs />;
      case 4:
        return <Notifications />;
      case 5:
        return <Settings userType={userType} />;

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
        userType={userType}
      />
      {navigateComponents(selectedPath)}
      {userType === "user" ? <SuggestionBar /> : <CompanyFollowers />}
    </div>
  );
};

export default Home;
