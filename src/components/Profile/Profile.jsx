import React, { useState, useEffect } from "react";
import axios from "axios";

import { StyledIcon } from "../Style/StyledBottomNavigationAction";
import LogOut from "./logout";

import {
  ProfileClocks,
  ProfileIcon,
  ProfileParentTitle,
  ProfileTitle,
  ProfileArrow,
  ProfileH3,
  ProfileSignal2,
  ProfileFull2,
  ProfileWife2,
  ProfileLogin,
  ProfileLoginImg,
  ProfileBox,
  ProfileImgIcon,
  ProfileDescription,
  UpdateBtn,
} from "./style";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [fullname, setFullname] = useState(
    localStorage.getItem("fullname") || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = getUserId();
        if (!userId) {
          // If userId is empty, return early
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:8081/profile?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setEmail(response.data.email);
        setFullname(response.data.fullname);
        setImageUrl(response.data.imageUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message || "Error fetching user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpdateProfile = (event) => {
    alert("Profile updated");
    // Implement update profile logic if needed
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:8081/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Image uploaded successfully", response);
        const uploadedImageUrl = response.data.imageUrl;
        setImageUrl(uploadedImageUrl); // Update image URL in the UI
        saveImageUrl(uploadedImageUrl); // Save image URL to the database if needed
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const saveImageUrl = (imageUrl) => {
    axios
      .post("http://localhost:8081/saveImageUrl", { imageUrl })
      .then((response) => {
        console.log("Image URL saved to database", response);
      })
      .catch((error) => {
        console.error("Error saving image URL:", error);
      });
  };

  if (loading) return <div>Loading...</div>;

  const displayStyle = {
    color: "#797C7B",
    fontSize: "14px",
    fontFamily: "Poppins",
  };
  const displayDesStyle = {
    fontSize: "18px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    paddingBottom: "15px",
  };

  return (
    <ProfileBox>
      <ProfileParentTitle>
        <ProfileClocks>
          <StyledIcon>9:41</StyledIcon>
        </ProfileClocks>
        <ProfileIcon>
          <StyledIcon>
            <ProfileSignal2 />
          </StyledIcon>
          <StyledIcon>
            <ProfileWife2 />
          </StyledIcon>
          <StyledIcon>
            <ProfileFull2 />
          </StyledIcon>
        </ProfileIcon>
      </ProfileParentTitle>
      <ProfileTitle>
        <ProfileArrow />
        <ProfileH3>Profile</ProfileH3>
      </ProfileTitle>
      <ProfileLoginImg>
        <ProfileImgIcon>
          <input type="file" onChange={handleFileChange} />
          <button
            style={{ width: "100px", padding: "5px", marginTop: "5px" }}
            onClick={handleUpload}
          >
            Add Img
          </button>
          <div>{imageUrl && <img src={imageUrl} alt="Profile" />}</div>
        </ProfileImgIcon>
        <ProfileLogin>
          <ProfileDescription>
            <div className="display_name">
              <h4 style={displayStyle}>Display Name</h4>
              <h2 style={displayDesStyle}>{fullname}</h2>
            </div>
            <div className="display_email">
              <h4 style={displayStyle}>Email Address</h4>
              <h2 style={displayDesStyle}>{email}</h2>
            </div>
          </ProfileDescription>
          <LogOut />
          <UpdateBtn onClick={handleUpdateProfile}>Update Profile</UpdateBtn>
        </ProfileLogin>
      </ProfileLoginImg>
    </ProfileBox>
  );
};

export default Profile;
