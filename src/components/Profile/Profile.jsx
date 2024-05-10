import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit } from "@mui/icons-material";
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
  EditIcon,
} from "./style";

const Profile = () => {
  const defaultImageUrl = "../../backend/uploads/default2.png";

  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem("imageUrl") || defaultImageUrl
  );
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]); // Define 'data' state
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8081/");
        setData(response.data[0]);
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

  const getUserId = () => {
    return localStorage.getItem("id");
  };

  const handleUpload = async () => {
    try {
      const user_id = getUserId();

      const formData = new FormData();
      formData.append("image", file);
      formData.append("user_id", user_id);

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
      const uploadedImageUrl = data.image;

      setImageUrl(uploadedImageUrl);
      localStorage.setItem("imageUrl", uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdateProfile = () => {
    const user_id = getUserId();
    const data = {
      full_name: newFullname,
      username: newUsername,
      user_id: user_id,
    };
    axios
      .put(`http://localhost:8081/profile/`, data)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setFullname(newFullname);
        setIsEditingFullname(false);
        localStorage.setItem("full_name", newFullname);
        setUsername(newUsername);
        setIsEditingUsername(false);
        localStorage.setItem("username", newUsername);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
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
          {imageUrl && <img style={ImageStyle} src={imageUrl} alt="Profile" />}
          <input type="file" onChange={handleFileChange} />
          <div>
            <img
              style={ImageStyle}
              src={
                data.image ? `http://localhost:8081/${data.image}` : imageUrl
              }
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
          <LogOut clearImageUrl={() => setImageUrl("")} />
          <UpdateBtn onClick={handleUpdateProfile}>Update Profile</UpdateBtn>
        </ProfileLogin>
      </ProfileLoginImg>
    </ProfileBox>
  );
};

export default Profile;
