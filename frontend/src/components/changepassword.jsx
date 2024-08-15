import React from "react";

const ChangePasswordForm = () => {
  return (
    <form className="change-password-form">
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
