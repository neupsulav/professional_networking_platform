import React from "react";

const applicants = [
  {
    id: 1,
    name: "Sandip Neupane",
    email: "sandipneupane@gmail.com",
    phone: "+1234567890",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    cvLink:
      "https://drive.google.com/file/d/1Nvh-qfR0SdmFOu-6ryRFv065q6xJMvLf/view?usp=sharing",
  },
  {
    id: 1,
    name: "Sandip Neupane",
    email: "sandipneupane@gmail.com",
    phone: "+1234567890",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    cvLink:
      "https://drive.google.com/file/d/1Nvh-qfR0SdmFOu-6ryRFv065q6xJMvLf/view?usp=sharing",
  },
  {
    id: 1,
    name: "Sandip Neupane",
    email: "sandipneupane@gmail.com",
    phone: "+1234567890",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    cvLink:
      "https://drive.google.com/file/d/1Nvh-qfR0SdmFOu-6ryRFv065q6xJMvLf/view?usp=sharing",
  },
  {
    id: 1,
    name: "Sandip Neupane",
    email: "sandipneupane@gmail.com",
    phone: "+1234567890",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    cvLink:
      "https://drive.google.com/file/d/1Nvh-qfR0SdmFOu-6ryRFv065q6xJMvLf/view?usp=sharing",
  },
  {
    id: 1,
    name: "Sandip Neupane",
    email: "sandipneupane@gmail.com",
    phone: "+1234567890",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    cvLink:
      "https://drive.google.com/file/d/1Nvh-qfR0SdmFOu-6ryRFv065q6xJMvLf/view?usp=sharing",
  },
  {
    id: 1,
    name: "Sandip Neupane",
    email: "sandipneupane@gmail.com",
    phone: "+1234567890",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    cvLink:
      "https://drive.google.com/file/d/1Nvh-qfR0SdmFOu-6ryRFv065q6xJMvLf/view?usp=sharing",
  },
  {
    id: 1,
    name: "Sandip Neupane",
    email: "sandipneupane@gmail.com",
    phone: "+1234567890",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    cvLink:
      "https://drive.google.com/file/d/1Nvh-qfR0SdmFOu-6ryRFv065q6xJMvLf/view?usp=sharing",
  },
];

const ApplicantsList = () => {
  return (
    <div className="applicants-list-container">
      <h1 className="applicants-list-title">List of Applicants</h1>
      {applicants.map((applicant) => (
        <div key={applicant.id} className="applicant-card">
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
