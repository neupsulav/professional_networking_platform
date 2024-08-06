import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupOptions from "./pages/SignupOptions";
import SignupUser from "./pages/SignupUser";
import SignupCompany from "./pages/SignupCompany";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-options" element={<SignupOptions />}/>
          <Route path="/signup-user" element={<SignupUser />}/>
          <Route path="/signup-company" element={<SignupCompany/>} />
      </Routes>
    </>
  );
};



export default App;
