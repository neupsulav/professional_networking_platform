import React, { useState } from "react";
import SignupUser from "./SignupUser";
import SignupCompany from "./SignupCompany";
import companyImage from "./images/co.png";
import userImage from "./images/user.png";
import { IoMdArrowBack } from "react-icons/io";

const SignupOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="signup-options-container">
      {selectedOption === null ? (
        <div className="options">
          <h2>Let's get started!</h2>

          <div className="signup_options">
            <div className="option" onClick={() => handleOptionClick("user")}>
              <img src={userImage} alt="User Icon" />
              <h3>Jobseeker</h3>
              <p>Create free account to apply!</p>
              <button>Register</button>
            </div>
            <h2>or</h2>
            <div
              className="option"
              onClick={() => handleOptionClick("company")}
            >
              <img src={companyImage} alt="Company Icon" />
              <h3>Company</h3>
              <p>Create free account to post vacancy!</p>
              <button>Register</button>
            </div>
          </div>
          <p className="signup_options_bottom_text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      ) : (
        <>
          {selectedOption === "user" && <SignupUser />}
          {selectedOption === "company" && <SignupCompany />}
          {/* <button
            onClick={() => setSelectedOption(null)}
            className="back_btn_signup"
          >
            Back
          </button> */}
          <div
            className="back_btn_signup"
            onClick={() => setSelectedOption(null)}
          >
            <IoMdArrowBack /> Back
          </div>
        </>
      )}
    </div>
  );
};

export default SignupOptions;
