import React from "react";
import BackButton from "./BackButton";

const ChangePasswordForm = ({ selectedPath, setSelectedPath }) => {
  return (
    <form className="change-password-form">
      <BackButton
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
      />
      <h3>Change Password</h3>
      <div className="form-group">
        <label htmlFor="current-password">Current Password</label>
        <input
          type="password"
          id="current-password"
          placeholder="Enter your current password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          placeholder="Enter your new password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-new-password">Confirm New Password</label>
        <input
          type="password"
          id="confirm-new-password"
          placeholder="Confirm your new password"
        />
      </div>
      <button type="submit" className="save-button">
        Save Changes
      </button>
    </form>
  );
};

export default ChangePasswordForm;
