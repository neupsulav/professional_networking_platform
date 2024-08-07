import React, { useState } from "react";
import SignupUser from "./SignupUser";
import SignupCompany from "./SignupCompany";
import companyImage from "./images/co.png";
import userImage from "./images/user.png";

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
          <p>or</p>
          <div className="option" onClick={() => handleOptionClick("user")}>
            <img src={userImage} alt="User Icon" />
            <h3>Jobseeker</h3>
            <p>Create free account to apply!</p>
            <button>Register</button>
          </div>
          <div className="option" onClick={() => handleOptionClick("company")}>
            <img src={companyImage} alt="Company Icon" />
            <h3>Company</h3>
            <p>Create free account to post vacancy!</p>
            <button>Register</button>
          </div>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      ) : (
        <>
          {selectedOption === "user" && <SignupUser />}
          {selectedOption === "company" && <SignupCompany />}
          <button onClick={() => setSelectedOption(null)}>Back</button>
        </>
      )}
    </div>
  );
};

export default SignupOptions;
