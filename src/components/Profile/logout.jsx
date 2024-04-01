import { useNavigate } from "react-router-dom";
import { Button } from "./style";
import React from "react";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
};

export default LogOut;
