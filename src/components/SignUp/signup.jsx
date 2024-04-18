import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./SignUpValidation"; // Assuming you have a file named SignUpValidation.js for validation
import "./signup.css";

const SignUp = () => {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    fullname: "",
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
    return Object.keys(validationErrors).every(
      (key) => validationErrors[key] === ""
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const res = await axios.post("http://localhost:8081/signup", values);
        navigate("/");
      } catch (err) {
        if (err.response) {
          console.error(`Error: ${err.response.status}`);
          alert("Server error: " + err.response.data);
        } else if (err.request) {
          console.error("Network error: No response received.");
          alert("Unable to connect to server. Please try again later.");
        } else {
          console.error("An unexpected error occurred: " + err.message);
          alert("An unexpected error occurred: " + err.message);
        }
      }
    }
  };

  return (
    <div className="SignUpSection">
      <div>
        <div className="SignUpTitle">
          <p className="titleSignUp">Log in to Chatbox</p>
          <p className="welcome">
            Get chatting with friends and family <br /> today by signing up for
            our chat app!
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputBox">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              placeholder="Enter fullname"
              onChange={handleInput}
              name="fullname"
            />
            <span>{errors.fullname && <span>{errors.fullname}</span>}</span>
          </div>
          <div className="inputBox1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={handleInput}
              name="username"
            />
            <span>{errors.username && <span>{errors.username}</span>}</span>
          </div>
          <div className="inputBox2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={handleInput}
              name="email"
            />
            <span>{errors.email && <span>{errors.email}</span>}</span>
          </div>
          <div className="inputBox3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={handleInput}
              name="password"
            />
            <span>{errors.password && <span>{errors.password}</span>}</span>
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
