import { useNavigate } from "react-router-dom";
import { LogDiv } from "./style";

import axios from "axios";
import React, { useState, useEffect } from "react";

const LogOut = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const LogOutStyle = {};

  return (
    <div style={LogOutStyle}>
      <LogDiv onClick={handleLogout}>
        <div className="change_password">
          <h4 style={{ color: "black" }}>Change password</h4>
          <h5 style={{ color: "#797C7B", paddingBottom: "15px" }}>
            Privacy, security, change number
          </h5>
        </div>
        <div className="log_out">
          <h4 style={{ color: "black", cursor: "pointer" }}>Log Out</h4>

          <h5 style={{ color: "#797C7B", cursor: "pointer" }}>
            {username && `Logged in as: ${username}`}
          </h5>
        </div>
      </LogDiv>
    </div>
  );
};

export default LogOut;
