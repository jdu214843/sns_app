import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignUpValidation";
import axios from "axios";
import "./signup.css";
const SignUp = () => {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (
      errors.username === "" &&
      errors.email === "" &&
      errors.password === ""
    ) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="SignUpSection">
      <div>
        <div className="SignUpTitle">
          <p className="titleSignUp">Log in to Chatbox</p>
          <p className="welcome">
            {" "}
            Get chatting with friends and family <br /> today by signing up for
            our chat app!
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputBox">
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
