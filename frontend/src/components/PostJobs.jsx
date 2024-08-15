import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Multiselect } from "multiselect-react-dropdown";

const PostJobsForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState([]);
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");

  const editor = useRef(null);

  const handleJobTypeChange = (selectedList, selectedItem) => {
    setJobType(selectedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic, e.g., save the job posting to the backend
    const jobTypeValues = jobType.map((option) => option.name);
    console.log({
      jobTitle,
      jobDescription,
      jobType: jobTypeValues,
      location,
      salary,
      skillsRequired,
    });
  };

  const jobTypeOptions = [
    { name: "Full-Time", id: 1 },
    { name: "Part-Time", id: 2 },
    { name: "Contract", id: 3 },
    { name: "Internship", id: 4 },
  ];

  return (
    <form className="post-jobs-form" onSubmit={handleSubmit}>
      <h3>Post a Job</h3>
      <div className="form-group">
        <label htmlFor="job-title">Job Title</label>
        <input
          type="text"
          id="job-title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="job-description">Job Description</label>
        <JoditEditor
          ref={editor}
          value={jobDescription}
          onChange={(newContent) => setJobDescription(newContent)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="job-type">Job Type</label>
        <Multiselect
          options={jobTypeOptions}
          displayValue="name"
          onSelect={handleJobTypeChange}
          onRemove={handleJobTypeChange}
          placeholder="Select job type"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter job location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter salary range"
        />
      </div>

      <div className="form-group">
        <label htmlFor="skills-required">Skills Required</label>
        <input
          type="text"
          id="skills-required"
          value={skillsRequired}
          onChange={(e) => setSkillsRequired(e.target.value)}
          placeholder="Enter required skills"
        />
      </div>

      <button type="submit" className="save-button">
        Post Job
      </button>
    </form>
  );
};

export default PostJobsForm;
