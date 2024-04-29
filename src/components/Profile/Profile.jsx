import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit } from "@mui/icons-material"; // Edit ikoni uchun

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
  EditIcon, // Izoh: Edit ikoniga mos EditIcon komponentini import qilamiz
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
  const [isEditingFullname, setIsEditingFullname] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newFullname, setNewFullname] = useState(fullname);
  const [newEmail, setNewEmail] = useState(email);

  const getUserId = () => {
    return localStorage.getItem("id");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const id = getUserId();

        if (!id) {
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:8081/profile?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

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
    if (!file) {
      alert("Please select an image to upload");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setImageUrl(dataURL); // Update image URL in the UI
      localStorage.setItem("imageUrl", dataURL); // Save image URL to local storage
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    const id = getUserId(); // Get user ID
    const data = {
      email: newEmail,
      fullname: newFullname,
    };

    axios
      .put(`http://localhost:8081/profile/${id}/update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        // Update state and UI after successful update
        setFullname(newFullname);
        setEmail(newEmail);
        setIsEditingFullname(false);
        setIsEditingEmail(false);
        // Update local storage with new email and fullname
        localStorage.setItem("email", newEmail);
        localStorage.setItem("fullname", newFullname);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle error if necessary
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
    display: "flex",
  };
  const ImageStyle = {
    width: "50px",
    height: "50px",
  };

  const profilInfoParent = {
    display: "flex",
  };

  const handleFullnameEdit = () => {
    setIsEditingFullname(true);
  };

  const handleEmailEdit = () => {
    setIsEditingEmail(true);
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
          </button>{" "}
          <div>
            {imageUrl && (
              <img style={ImageStyle} src={imageUrl} alt="Profile" />
            )}
          </div>
        </ProfileImgIcon>
        <ProfileLogin>
          <ProfileDescription>
            <div>
              <h4 style={displayStyle}>Display Name</h4>
              {isEditingFullname ? (
                <input
                  type="text"
                  value={newFullname}
                  onChange={(e) => setNewFullname(e.target.value)}
                />
              ) : (
                <>
                  <h2 style={displayDesStyle}>
                    {fullname}
                    <EditIcon onClick={handleFullnameEdit}>
                      <Edit />
                    </EditIcon>
                  </h2>
                </>
              )}
            </div>
            <div>
              <h4 style={displayStyle}>Email Address</h4>
              {isEditingEmail ? (
                <input
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              ) : (
                <>
                  <h2 style={displayDesStyle}>
                    {email}
                    <EditIcon onClick={handleEmailEdit}>
                      <Edit />
                    </EditIcon>
                  </h2>
                </>
              )}
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
