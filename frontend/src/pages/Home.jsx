import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Newsfeed from "../components/Newsfeed";
import SuggestionBar from "../components/SuggestionBar";
import Jobs from "../components/Jobs";
import UserProfile from "../components/userProfile";
import Notifications from "../components/Notifications";

const Home = () => {
  const [selectedPath, setSelectedPath] = useState(0);

  //   to navigate using sidebar options
  const navigateComponents = () => {
    switch (selectedPath) {
      case 0:
        return <Newsfeed />;
      case 1:
        return <UserProfile />;
      case 2:
        return <Jobs />;
      case 4:
        return <Notifications />;

      default:
        break;
    }
  };

  return (
    <div className="pageContainer">
      <Sidebar selectedPath={selectedPath} setSelectedPath={setSelectedPath} />
      {navigateComponents(selectedPath)}
      <SuggestionBar />
    </div>
  );
};

export default Home;
