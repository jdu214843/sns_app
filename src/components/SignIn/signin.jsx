import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import Validation from "./SignInValidation.js";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    <div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
            />
            <span>{errors.email && <span>{errors.email}</span>}</span>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInput}
            />
            <span>{errors.password && <span>{errors.password}</span>}</span>
          </div>
          <button type="submit">Sign In</button>
          <p>or</p>
          <Link to={"/signup"}>Create Account</Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
