import React, { useState } from 'react';
import SignupUser from './SignupUser';
import SignupCompany from './SignupCompany';

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
          <div className="option" onClick={() => handleOptionClick('user')}>
            <img src="/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&s" alt="User Icon" />
            <h3>Jobseeker</h3>
            <p>Create free account to apply!</p>
            <button>Register</button>
          </div>
          <div className="option" onClick={() => handleOptionClick('company')}>
            <img src="/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpHhmRyyFUqDgbP7F0qTVkiPXb5GxENtaHVQ&s" alt="Company Icon" />
            <h3>Employer</h3>
            <p>Create free account to post vacancy!</p>
            <button>Register</button>
          </div>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      ) : (
        <>
          {selectedOption === 'user' && <SignupUser />}
          {selectedOption === 'company' && <SignupCompany />}
          <button onClick={() => setSelectedOption(null)}>Back</button>
        </>
      )}
    </div>
  );
};

export default SignupOptions;
