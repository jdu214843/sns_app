import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./SignUpValidation"; // Assuming you have a file named SignUpValidation.js for validation
import "./signup.css";

const SignUp = () => {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleValidation = () => {
    const validationErrors = Validation(values); // Assuming Validation function is correctly defined in SignUpValidation.js
    setErrors(validationErrors);
    return Object.values(validationErrors).every((error) => !error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const res = await axios.post("http://localhost:8081/signup", {
          full_name: values.full_name,
          username: values.username,
          email: values.email,
          password: values.password,
        });
        console.log(res.data); // Optional: Log response data
        // Redirect or perform any necessary actions upon successful signup
        navigate("/");
      } catch (err) {
        console.error("Error signing up:", err);
        // Handle errors, display appropriate messages to the user
        // You can access error response data using err.response.data
        alert("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="SignUpSection">
      <div>
        <div className="SignUpTitle">
          <p className="titleSignUp">Sign Up for Chatbox</p>
          <p className="welcome">
            Get chatting with friends and family <br /> today by signing up for
            our chat app!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              onChange={handleInput}
              name="full_name"
              value={values.full_name}
            />
            {errors.full_name && <span>{errors.full_name}</span>}
          </div>
          <div className="inputBox1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={handleInput}
              name="username"
              value={values.username}
            />
            {errors.username && <span>{errors.username}</span>}
          </div>
          <div className="inputBox2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={handleInput}
              name="email"
              value={values.email}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="inputBox3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={handleInput}
              name="password"
              value={values.password}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button className="sign_btn" type="submit">
            Sign Up
          </button>
          <p className="or">or</p>
          <Link to={"/"} className="sign_in">
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
