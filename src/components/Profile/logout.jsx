import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogDiv, LogOutDiv } from "./style";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("full_name");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div>
      <LogDiv onClick={handleLogout}>
        <LogOutDiv>LogOut</LogOutDiv>
      </LogDiv>
    </div>
  );
};

export default LogOut;
