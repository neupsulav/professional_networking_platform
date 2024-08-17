import React, { useState } from "react";
import JoditEditor from "jodit-react";
import { Multiselect } from "multiselect-react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomMultiselect from "./CustomMultiSelect";
import BackButton from "./BackButton";

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobIntro: "",
    location: "",
    deadline: new Date(),
    numberOfPosts: 1,
    jobRequirements: "",
    responsibilities: "",
    jobType: [],
  });

  const jobTypes = ["Full-Time", "Part-Time", "Internship", "Contract"];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJobTypeChange = (selectedList) => {
    setFormData({ ...formData, jobType: selectedList });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="jobform-container">
      <BackButton />
      <h2 className="jobform-title">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="jobform-form">
        <div className="jobform-group jobform-jobtitle">
          <label className="jobform-label">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="jobform-input"
            required
          />
        </div>

        <div className="jobform-group jobform-jobintro">
          <label className="jobform-label">Short Job Intro</label>
          <textarea
            name="jobIntro"
            value={formData.jobIntro}
            onChange={handleInputChange}
            className="jobform-textarea"
            required
          />
        </div>

        <div className="jobform-group jobform-location">
          <label className="jobform-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="jobform-input"
            required
          />
        </div>

        <div className="jobform-group jobform-deadline">
          <label className="jobform-label">Application Deadline</label>
          <DatePicker
            selected={formData.deadline}
            onChange={(date) => setFormData({ ...formData, deadline: date })}
            className="jobform-datepicker"
            required
          />
        </div>

        <div className="jobform-group jobform-numberofposts">
          <label className="jobform-label">Number of Posts</label>
          <input
            type="number"
            name="numberOfPosts"
            value={formData.numberOfPosts}
            onChange={handleInputChange}
            className="jobform-input"
            required
          />
        </div>

        <div className="jobform-group jobform-requirements">
          <label className="jobform-label">Job Requirements</label>
          <JoditEditor
            value={formData.jobRequirements}
            onChange={(content) =>
              setFormData({ ...formData, jobRequirements: content })
            }
            className="jobform-editor"
          />
        </div>

        <div className="jobform-group jobform-responsibilities">
          <label className="jobform-label">Responsibilities</label>
          <JoditEditor
            value={formData.responsibilities}
            onChange={(content) =>
              setFormData({ ...formData, responsibilities: content })
            }
            className="jobform-editor"
          />
        </div>

        <div className="form-group">
          <label className="job-type-label">Job Type</label>
          <CustomMultiselect
            options={jobTypes}
            selectedOptions={formData.jobType}
            setSelectedOptions={handleJobTypeChange}
          />
        </div>

        <button type="submit" className="jobform-submit">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
