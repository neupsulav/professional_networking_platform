import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Newsfeed from "./components/newsfeed/Newsfeed";
import SuggestionBar from "./components/suggestionsbar/SuggestionBar";
import Navbar from "./components/navbar/Navbar";

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
