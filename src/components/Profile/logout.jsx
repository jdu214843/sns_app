import { useNavigate } from "react-router-dom";
import { LogDiv, LogOutDiv } from "./style";
import { Edit, Fullscreen } from "@mui/icons-material"; // Import the edit icon
import React, { useState, useEffect } from "react";
import axios from "axios";

const LogOut = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [newUsername, setNewUsername] = useState(username); // State to store new username
  const getUserId = () => {
    return localStorage.getItem("id");
  };

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

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("fullname");
    localStorage.removeItem("id");
    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const id = getUserId();
    const data = {
      username: newUsername,
    };

    axios
      .put(`http://localhost:8081/profile/${id}/updateUsername`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setNewUsername(newUsername);
        setIsEditing(false);
        localStorage.setItem("username", newUsername);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle error if necessary
      });
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
        <div className="log_out">
          <LogOutDiv onClick={handleLogout}>Log Out</LogOutDiv>

          <h5
            style={{
              color: "#797C7B",
              cursor: "pointer",
              width: "100%",
              transition: "color 0.3s ease",
              display: "flex",
            }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  style={{ width: "80%", marginRight: "5px" }}
                />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                {username && `Logged in as: ${username}`}
                <Edit
                  onClick={handleEdit}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.target.style.color = "blue")}
                  onMouseLeave={(e) => (e.target.style.color = "#24786d")}
                />
              </>
            )}
          </h5>
        </div>
      </LogDiv>
    </div>
  );
};

export default LogOut;
