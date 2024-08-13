import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile number validation
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(formData.phone)) {
      newErrors.phone = "Mobile number must be 10 digits";
    }

    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation
    if (formData.password !== formData.cpassword) {
      newErrors.cpassword = "Passwords do not match";
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
      const { name, email, phone, password, cpassword } = formData;

      // to send data to backend
      const res = await fetch("/api/auth/usersignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password,
          cpassword: cpassword,
        }),
      });

      // to check for status of API post request
      if (res.status === 201) {
        toast.success("An email has been sent, please verify your email.");
        // Reset form only after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        });
      } else if (res.status === 409) {
        toast.warn("User already exists");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="signup-form-container">
      <ToastContainer />
      <h2>Sign Up as User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
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
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
          />
          {errors.cpassword && (
            <p className="error-message">{errors.cpassword}</p>
          )}
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupUser;
