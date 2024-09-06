import React from "react";

const ApplicantsList = ({ applicants }) => {
  return (
    <div className="applicants-list-container">
      <h1 className="applicants-list-title">List of Applicants</h1>
      {applicants.map((applicant, index) => (
        <div key={index} className="applicant-card">
          <img
            src={applicant.image}
            alt={applicant.name}
            className="applicant-image"
          />
          <div className="applicant-info">
            <h2 className="applicant-name">{applicant.name}</h2>
            <p className="applicant-email">{applicant.email}</p>
            <p className="applicant-phone">{applicant.phone}</p>
          </div>
          <button
            className="view-cv-button"
            onClick={() => window.open(applicant.cvLink, "_blank")}
          >
            View CV
          </button>
        </div>
      ))}
    </div>
  );
};

export default ApplicantsList;
