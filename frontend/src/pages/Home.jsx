import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Newsfeed from "../components/Newsfeed";
import SuggestionBar from "../components/SuggestionBar";

const Home = () => {
  return (
    <div className="pageContainer">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Newsfeed />} />
      </Routes>
      <SuggestionBar />
    </div>
  );
};

export default Home;
