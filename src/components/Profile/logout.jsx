import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogDiv, LogOutDiv } from "./style";

const defaultImageUrl = "path_to_default_image"; // Set your default image path here

const LogOut = ({ clearImageUrl }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("full_name");
    localStorage.removeItem("id");
    if (localStorage.getItem("imageUrl")) {
      localStorage.removeItem("imageUrl");
    }
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
