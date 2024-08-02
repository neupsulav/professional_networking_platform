import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Newsfeed from "./components/Newsfeed";
import SuggestionBar from "./components/SuggestionBar";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pageContainer">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Newsfeed />} />
        </Routes>
        <SuggestionBar />
      </div>
    </>
  );
};

export default App;
