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

const display_style = {
  color: "#797C7B",
  fontSize: "14px",
  fontFamily: "Poppins",
};
const display_des_style = {
  fontSize: "18px",
  fontFamily: "Poppins",
  fontWeight: "bold", // Changed from fontweight to fontWeight
  paddingBottom: "15px",
};

const Profile = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8081/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setEmail(response.data.email);
        setFullname(response.data.fullname);
      } catch (error) {
        console.error("Error fetching user profile:", error);
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
        console.log("Image uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
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
          <button onClick={handleUpload}>Upload Image</button>
        </ProfileImgIcon>
        <ProfileLogin>
          <ProfileDescription>
            <div className="display_name">
              <h4 style={display_style}>Display Name</h4>
              <h2 style={display_des_style}>{fullname}</h2>
            </div>
            <div className="display_email">
              <h4 style={display_style}>Email Address</h4>
              <h2 style={display_des_style}>{email}</h2>
            </div>
          </ProfileDescription>
          <LogOut />
        </ProfileLogin>
      </ProfileLoginImg>
    </ProfileBox>
  );
};

export default Profile;
