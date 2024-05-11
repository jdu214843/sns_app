import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignInValidation";
import "./signin.css";

const SignIn = ({ onSignIn }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    console.log("Validation errors:", validationErrors);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:8081/signin", values);

        if (res.status === 200 && res.data.status === "success") {
          const { email, full_name, username, id } = res.data.user;
          localStorage.setItem("email", email);
          localStorage.setItem("username", username);
          localStorage.setItem("full_name", full_name);
          localStorage.setItem("id", id);

          // console.log(0);
          navigate("/home");
          // console.log(1);
        } else {
          alert("No record existed");
        }
      } catch (err) {
        console.error("Error signing in:", err); // Handle error
        alert("An error occurred while signing in. Please try again later.");
      }
    }
  };

  return (
    <div className="section_box">
      <div>
        <div className="LogBoxtitle">
          <p className="logTitle">Log in to Chatbox</p>
          <p className="welcome">
            Welcome back! Sign in using your social <br /> account or email to
            continue
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleInput}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="inputBoxSignIn">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={values.password} 
              onChange={handleInput}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button className="sign_btn" type="submit">
            Sign In
          </button>
          <p className="or">or</p>
          <Link to="/signup" className="create_account">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
