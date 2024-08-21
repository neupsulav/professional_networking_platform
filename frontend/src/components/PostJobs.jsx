import React, { useState } from "react";
import JoditEditor from "jodit-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomMultiselect from "./CustomMultiSelect";
import BackButton from "./BackButton";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobForm = () => {
  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobIntro: "",
    location: "",
    deadline: new Date(),
    numberOfPosts: 1,
    salary: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // to post job data
    const res = await fetch("/api/createjob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        position: formData.jobTitle,
        intro: formData.jobIntro,
        location: formData.location,
        salary: formData.salary,
        deadline: formData.deadline,
        noOfPost: formData.numberOfPosts,
        requirements: formData.jobRequirements,
        responsibilities: formData.responsibilities,
        type: formData.jobType[0],
      }),
    });

    if (res.status === 201) {
      toast.success("Job Posted");
      // reset form after submission
      setFormData({
        jobTitle: "",
        jobIntro: "",
        location: "",
        deadline: new Date(),
        numberOfPosts: 1,
        salary: "",
        jobRequirements: "",
        responsibilities: "",
        jobType: [],
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="jobform-container">
      <ToastContainer />
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

        <div className="jobform-group jobform-numberofposts">
          <label className="jobform-label">Salary</label>
          <input
            type="text"
            name="salary"
            placeholder="Eg: 100000 or Negotiable"
            value={formData.salary}
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
