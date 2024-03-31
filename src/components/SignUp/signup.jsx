import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <div>
        <form action="">
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter username" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button>Sign Up</button>
          <p>or</p>
          <Link to={"/"}>Sign In</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
