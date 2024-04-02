import { useNavigate } from "react-router-dom";
import { Button } from "./style";
import React from "react";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const LogOutStyle = {
    textAlign: "center",
  };

  return (
    <div style={LogOutStyle}>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
};

export default LogOut;
