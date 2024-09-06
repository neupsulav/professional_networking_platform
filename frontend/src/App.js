import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupOptions from "./pages/SignupOptions";
import SignupUser from "./pages/SignupUser";
import SignupCompany from "./pages/SignupCompany";
import NotFound from "./pages/ErrorPage";
import UsersProfile from "./pages/UsersProfile";
import CompaniesProfile from "./pages/CompaniesProfile";
import Settings from "./components/settings";
import Header from "./components/searchbar";
import SinglePost from "./pages/SinglePost";

const App = () => {
  const location = useLocation();
  const hideHeaderRoutes = [
    "/login",
    "/signup-options",
    "/signup-user",
    "/signup-company",
  ];

  return (
    <>
      {/* Conditionally render Header based on the current route */}
      {/* {!hideHeaderRoutes.includes(location.pathname) && <Header />} */}
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-options" element={<SignupOptions />} />
        <Route path="/signup-user" element={<SignupUser />} />
        <Route path="/signup-company" element={<SignupCompany />} />
        <Route path="/user/:id" element={<UsersProfile />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/company/:id" element={<CompaniesProfile />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
