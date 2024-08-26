import React, { useState } from "react";
import BackButton from "./BackButton";
// import { useRef } from "react";
// import JoditEditor from "jodit-react";

const CompanySettingsForm = () => {
  const [companyOverview, setCompanyOverview] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState("");
  const [logo, setLogo] = useState(null);
  const [jobOpenings, setJobOpenings] = useState("");
  const [companyPolicies, setCompanyPolicies] = useState("");

  // for jodit text editor
  // const editor = useRef(null);
  // const [content, setContent] = useState("");

  // const config = {
  //   placeholder: "Write blogs content here....",
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Company Form submitted:", {
      companyOverview,
      industry,
      companySize,
      contactInformation,
      socialMediaLinks,
      logo,
      jobOpenings,
      companyPolicies,
    });
  };

  return (
    <div className="profile-setting-form-container">
     <BackButton />
      <h2>Edit Company Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Overview</label>
          <textarea
            value={companyOverview}
            onChange={(e) => setCompanyOverview(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Company Size</label>
          <input
            type="text"
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
          />
        </div>
        {/* <div className="newstextEditor">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div> */}
        <div className="form-group">
          <label>Social Media Links</label>
          <input
            type="text"
            value={socialMediaLinks}
            onChange={(e) => setSocialMediaLinks(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Logo and Branding</label>
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label>Job Openings</label>
          <input
            type="text"
            value={jobOpenings}
            onChange={(e) => setJobOpenings(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Company Policies</label>
          <textarea
            value={companyPolicies}
            onChange={(e) => setCompanyPolicies(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default CompanySettingsForm;
