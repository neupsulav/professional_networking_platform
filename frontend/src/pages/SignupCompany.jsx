import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // Company Name validation
    if (formData.companyName.trim().length < 3) {
      newErrors.companyName = "Company name must be at least 3 characters long";
    }

    // Contact Number validation
    const contactNumberPattern = /^\d{10}$/;
    if (!contactNumberPattern.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // to get all the data
      const { companyName, email, contactNumber, password, confirmPassword } =
        formData;

      // to send data to backend
      const res = await fetch("/api/auth/companysignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: companyName,
          email: email,
          phone: contactNumber,
          password: password,
          cpassword: confirmPassword,
        }),
      });

      // to check for status of API post request
      if (res.status === 201) {
        toast.success("An email has been sent, please verify your email.");
        // Reset form only after successful submission
        setFormData({
          companyName: "",
          contactNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else if (res.status === 409) {
        toast.warn("Email already exists");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="signup-form-container">
      <ToastContainer />
      <h2>Sign Up as Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          {errors.companyName && (
            <p className="error-message">{errors.companyName}</p>
          )}
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && (
            <p className="error-message">{errors.contactNumber}</p>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupCompany;
