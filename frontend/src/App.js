import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupOptions from "./pages/SignupOptions";
import SignupUser from "./pages/SignupUser";
import SignupCompany from "./pages/SignupCompany";
import NotFound from "./pages/ErrorPage";
import UsersProfile from "./pages/UsersProfile";
import CompaniesProfile from "./pages/CompaniesProfile";
import Settings from "./components/settings";

const App = () => {
  const userType = 'user';
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-options" element={<SignupOptions />} />
        <Route path="/signup-user" element={<SignupUser />} />
        <Route path="/signup-company" element={<SignupCompany />} />
        <Route path="/user/:id" element={<UsersProfile />} />
        <Route path="/company/:id" element={<CompaniesProfile />} />
        <Route path="/settings" element={<Settings userType={"user"} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
