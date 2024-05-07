import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit } from "@mui/icons-material"; // Edit ikoni uchun

import { StyledIcon } from "../Style/StyledBottomNavigationAction";
import LogOut from "./logout";

import {
  ProfileTitle,
  ProfileArrow,
  ProfileH3,
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
  const [data, setData] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [full_name, setFullname] = useState(
    localStorage.getItem("full_name") || ""
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingFullname, setIsEditingFullname] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const [newFullname, setNewFullname] = useState(full_name);
  const [newUsername, setNewUsername] = useState(username);

  const getUserId = () => {
    return localStorage.getItem("id");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user_id = getUserId();

        if (!user_id) {
          setLoading(false);
          return;
        }

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

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("user_id", getUserId());

      const response = await axios.post(
        "http://localhost:8081/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully:", response.data);

      setImageUrl(response.data.imageUrl);
      localStorage.setItem("imageUrl", response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdateProfile = () => {
    const user_id = getUserId(); // Get user ID
    const data = {
      full_name: newFullname,
      username: newUsername,
      user_id: user_id,
    };

    axios
      .put(`http://localhost:8081/profile/`, data)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        // Update state and UI after successful update
        setFullname(newFullname);

        setIsEditingFullname(false);

        localStorage.setItem("full_name", newFullname);
        setUsername(newUsername);

        setIsEditingUsername(false);

        localStorage.setItem("username", newUsername);
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
    width: "100px",
    height: "100px",
    marginTop: "5px",
    borderRadius: "50%",
  };

  const EditInput = {
    width: "50%",
  };

  const handleFullnameEdit = () => {
    setIsEditingFullname(true);
  };
  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
  };

  return (
    <ProfileBox>
      <ProfileTitle>
        <ProfileArrow />
        <ProfileH3>Profile</ProfileH3>
      </ProfileTitle>
      <ProfileLoginImg>
        <ProfileImgIcon>
          {/* {imageUrl && <img style={ImageStyle} src={imageUrl} alt="Profile" />} */}
          <input type="file" onChange={handleFileChange} />
          <div>
            <img
              style={ImageStyle}
              src={`http://localhost:8081/` + data.image}
              alt=""
            />
          </div>
          <button
            style={{ width: "100px", padding: "5px" }}
            onClick={handleUpload}
          >
            Add Img
          </button>{" "}
        </ProfileImgIcon>
        <ProfileLogin>
          <ProfileDescription>
            <div>
              <h4 style={displayStyle}>Display Name</h4>
              {isEditingFullname ? (
                <input
                  style={EditInput}
                  type="text"
                  value={newFullname}
                  onChange={(e) => setNewFullname(e.target.value)}
                />
              ) : (
                <>
                  <h2 style={displayDesStyle}>
                    {full_name}
                    <EditIcon onClick={handleFullnameEdit}>
                      <Edit
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                        onMouseEnter={(e) => (e.target.style.color = "blue")}
                        onMouseLeave={(e) => (e.target.style.color = "#24786d")}
                      />
                    </EditIcon>
                  </h2>
                </>
              )}
            </div>
            <div>
              <h4 style={displayStyle}>Email Address</h4>
              <h2 style={displayDesStyle}>{email}</h2>
            </div>
            <div className="userNameParent">
              <div>
                <h4 style={displayStyle}>Username</h4>
                {isEditingUsername ? (
                  <input
                    style={EditInput}
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                ) : (
                  <>
                    <h2 style={displayDesStyle}>
                      {username}
                      <EditIcon onClick={handleUsernameEdit}>
                        <Edit
                          style={{ marginLeft: "5px", cursor: "pointer" }}
                          onMouseEnter={(e) => (e.target.style.color = "blue")}
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#24786d")
                          }
                        />
                      </EditIcon>
                    </h2>
                  </>
                )}
              </div>
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
