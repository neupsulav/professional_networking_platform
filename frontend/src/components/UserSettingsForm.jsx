import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import BackButton from "./BackButton";

const UserSettingsForm = ({ setSelectedOption }) => {
  const [jobPreference, setJobPreference] = useState("");
  const [skills, setSkills] = useState("");
  const [socialAccount, setSocialAccount] = useState("");
  const [cv, setCv] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User Form submitted:", {
      jobPreference,
      skills,
      socialAccount,
      cv,
    });
  };

  return (
    <div>
      <div className="profile-setting-form-container">
      <BackButton />
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Preference</label>
            <input
              type="text"
              value={jobPreference}
              onChange={(e) => setJobPreference(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Social Account</label>
            <input
              type="text"
              value={socialAccount}
              onChange={(e) => setSocialAccount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Upload CV</label>
            <input type="file" onChange={(e) => setCv(e.target.files[0])} />
          </div>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsForm;
