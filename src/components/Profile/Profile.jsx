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
} from "./style";

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

const Profile = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [fullname, setFullname] = useState(
    localStorage.getItem("fullname") || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8081/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setEmail(response.data.email);
        setFullname(response.data.fullname);
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

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:8081/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Image uploaded successfully", response);
        const imageUrl = response.data.imageUrl;
        saveImageUrl(imageUrl); // Faylning URL manzilini ma'lumotlar bazasiga saqlash
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
        </ProfileLogin>
      </ProfileLoginImg>
    </ProfileBox>
  );
};

export default Profile;
