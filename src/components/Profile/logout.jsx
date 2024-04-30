import { useNavigate } from "react-router-dom";
import { LogDiv } from "./style";

import React, { useEffect } from "react";

const LogOut = () => {
  useEffect(() => {
    // const storedUsername = localStorage.getItem("username");
    // if (storedUsername) {
    //   setUsername(storedUsername);
    // }
    // const storedUserId = localStorage.getItem("id");
    // if (storedUserId) {
    //   setUserId(storedUserId);
    // }
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("email");
  //   localStorage.removeItem("password");
  //   localStorage.removeItem("fullname");
  //   localStorage.removeItem("id");
  //   navigate("/");
  // };

  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  return (
    <div>
      <LogDiv>
        {/* <div className="change_password">
          <h4 style={{ color: "black" }}>Change password</h4>
          <h5 style={{ color: "#797C7B", paddingBottom: "15px" }}>
            Privacy, security, change number
          </h5>
        </div> */}
      </LogDiv>
    </div>
  );
};

export default LogOut;
