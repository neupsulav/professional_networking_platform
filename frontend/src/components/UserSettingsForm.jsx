import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import Select from "react-select";

const UserSettingsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    bio: "",
    location: "",
    image: null,
    cv: null,
    phone: "",
    skills: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    setFormData({ ...formData, [name]: file });

    if (name === "image") {
      setImagePreview(URL.createObjectURL(file));
    } else if (name === "cv") {
      setCvPreview(URL.createObjectURL(file));
    }
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormData({ ...formData, skills: selectedOptions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User Form submitted:", formData);
  };

  const skillOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Java", label: "Java" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "C++", label: "C++" },
    { value: "C#", label: "C#" },
    { value: "SQL", label: "SQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "PHP", label: "PHP" },
    { value: "Laravel", label: "Laravel" },
    { value: "Ruby", label: "Ruby" },
    { value: "Ruby on Rails", label: "Ruby on Rails" },
    { value: "Go", label: "Go" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "Swift", label: "Swift" },
    { value: "Objective-C", label: "Objective-C" },
    { value: "Android Development", label: "Android Development" },
    { value: "iOS Development", label: "iOS Development" },
    { value: "AWS", label: "AWS" },
    { value: "Azure", label: "Azure" },
    { value: "GCP", label: "GCP" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Terraform", label: "Terraform" },
    { value: "CI/CD", label: "CI/CD" },
    { value: "Git", label: "Git" },
    { value: "Jenkins", label: "Jenkins" },
    { value: "Ansible", label: "Ansible" },
    { value: "Puppet", label: "Puppet" },
    { value: "Chef", label: "Chef" },
    { value: "Linux", label: "Linux" },
    { value: "Windows Server", label: "Windows Server" },
    { value: "Networking", label: "Networking" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Data Science", label: "Data Science" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Deep Learning", label: "Deep Learning" },
    { value: "NLP", label: "NLP" },
    { value: "Data Analysis", label: "Data Analysis" },
    { value: "Big Data", label: "Big Data" },
    { value: "Hadoop", label: "Hadoop" },
    { value: "Spark", label: "Spark" },
    { value: "Tableau", label: "Tableau" },
    { value: "Power BI", label: "Power BI" },
    { value: "Excel", label: "Excel" },
    { value: "Business Analysis", label: "Business Analysis" },
    { value: "Project Management", label: "Project Management" },
    { value: "Agile", label: "Agile" },
    { value: "Scrum", label: "Scrum" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Figma", label: "Figma" },
    { value: "Adobe XD", label: "Adobe XD" },
    { value: "Photoshop", label: "Photoshop" },
    { value: "Illustrator", label: "Illustrator" },
    { value: "SEO", label: "SEO" },
    { value: "Content Writing", label: "Content Writing" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Social Media Management", label: "Social Media Management" },
    { value: "Salesforce", label: "Salesforce" },
    { value: "SAP", label: "SAP" },
  ];

  return (
    <div className="profile-setting-form-container">
      <IoMdArrowBack />
      <h2>Edit Profile</h2>
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Skills</label>
          <Select
            className="react-select-container"
            isMulti
            name="skills"
            options={skillOptions}
            value={formData.skills}
            onChange={handleSkillsChange}
          />
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
          <label>Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="ImagePreview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Upload CV</label>
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          {cvPreview && (
            <a href={cvPreview} target="_blank" rel="noopener noreferrer">
              <button type="button" className="view-cv-button-settings">
                View CV
              </button>
            </a>
          )}
        </div>
        <div className="form-group">
          <label>Phone</label>
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

export default UserSettingsForm;
