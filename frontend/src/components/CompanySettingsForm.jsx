import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import BackButton from "./BackButton";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanySettingsForm = ({ companyData }) => {
  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwtToken");

  const [formData, setFormData] = useState({
    name: companyData.company.name,
    image: null,
    bio: companyData.company.bio,
    location: companyData.company.location,
    employees: companyData.company.employees,
    industry: companyData.company.industry,
    overview: companyData.company.overview,
    services: companyData.company.services,
    phone: companyData.company.phone,
  });

  const overviewEditor = useRef(null);
  const servicesEditor = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleJoditChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object
    const data = new FormData();
    data.append("name", formData.name);
    if (formData.image) data.append("image", formData.image);
    data.append("bio", formData.bio);
    data.append("location", formData.location);
    data.append("employees", formData.employees);
    data.append("industry", formData.industry);
    data.append("overview", formData.overview);
    data.append("services", formData.services);
    data.append("phone", formData.phone);

    // to send data to backend
    const res = await fetch("/api/updateCompanyProfile", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      body: data,
    });

    if (res.status === 201) {
      toast.success("Data updated successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const joditConfig = {
    readonly: false,
    placeholder: "Start typing here...",
  };

  return (
    <div className="profile-setting-form-container">
      <ToastContainer />
      <BackButton />
      <h2>Edit Company Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Number of Employees</label>
          <input
            type="text"
            name="employees"
            value={formData.employees}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Company Overview</label>
          <JoditEditor
            ref={overviewEditor}
            value={formData.overview}
            config={joditConfig}
            onBlur={(newContent) => handleJoditChange("overview", newContent)}
          />
        </div>
        <div className="form-group">
          <label>Services</label>
          <JoditEditor
            ref={servicesEditor}
            value={formData.services}
            config={joditConfig}
            onBlur={(newContent) => handleJoditChange("services", newContent)}
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
