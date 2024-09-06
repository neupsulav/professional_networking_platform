import React from "react";

const ApplicantsList = ({ applicants }) => {
  return (
    <div className="applicants-list-container">
      <h1 className="applicants-list-title">List of Applicants</h1>
      {applicants.length > 0 ? (
        applicants.map((applicant, index) => (
          <div key={index} className="applicant-card">
            <img
              src={applicant.user.image}
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
              onClick={() => window.open(applicant.user.cv, "_blank")}
            >
              View CV
            </button>
          </div>
        ))
      ) : (
        <p
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px" }}
        >
          No one has applied to this job yet
        </p>
      )}
    </div>
  );
};

export default ApplicantsList;
