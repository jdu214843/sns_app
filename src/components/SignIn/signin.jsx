import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignInValidation.js";
import axios from "axios";
import "./signin.css";
const SignIn = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      try {
        const res = await axios
          .post("http://localhost:8081/signin", values)
          .then((res) => {
            if (res.data === "Success") {
              navigate("/home");
            } else {
              alert("No record existed");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="section_box">
      <div>
        <div className="LogBoxtitle">
          <p className="logTitle">Log in to Chatbox</p>
          <p className="welcome">
            {" "}
            Welcome back! Sign in using your social <br /> account or email to
            continue us
          </p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="inputBox">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
            />
            <span>{errors.email && <span>{errors.email}</span>}</span>
          </div>
          <div className="inputBox2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInput}
            />
            <span>{errors.password && <span>{errors.password}</span>}</span>
          </div>
          <button className="sign_btn" type="submit">
            Sign In
          </button>
          <p className="or">or</p>
          <Link to={"/signup"} className="create_account">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
