import { useNavigate } from "react-router-dom";
import { LogDiv, LogOutDiv } from "./style";

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
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("fullname");
    }

    navigate("/");
  };

  return (
    <div>
      <LogDiv>
        <div className="change_password">
          <h4 style={{ color: "black" }}>Change password</h4>
          <h5 style={{ color: "#797C7B", paddingBottom: "15px" }}>
            Privacy, security, change number
          </h5>
        </div>
        <div className="log_out" onClick={handleLogout}>
          <LogOutDiv>Log Out</LogOutDiv>

          <h5 style={{ color: "#797C7B", cursor: "pointer" }}>
            {username && `Logged in as: ${username}`}
          </h5>
        </div>
      </LogDiv>
    </div>
  );
};

export default LogOut;
