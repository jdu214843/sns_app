import { StyledIcon } from "../Style/StyledBottomNavigationAction";
import { useState } from "react";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import axios from "axios";

import {
  HomeParent,
  HomePost,
  HomeParentTitle,
  HomeClocks,
  HomeIcons,
  Input,
  Button,
  MaxLengthText,
  UserIcon,
  PostContainer,
  PostText,
  IconContainer,
  UserIcon2,
  StyledIconButton,
  PostTextContainer,
  PostUserContainer,
  UserNiceNameContainer,
  HorizontalMeatballIcon,
  MeatBox,
  FavoriteIconStyle,
  CommentIconStyle,
  BookmarkIconStyle,
  CrudBtn,
} from "./style";

const Home = ({
  displayedText,
  setDisplayedText,
  bookmarkedPosts,
  setBookmarkedPosts,
}) => {
  const [postText, setPostText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [replies, setReplies] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [replyingToPost, setReplyingToPost] = useState(null);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const maxLength = 140;

  // Handle changes in the post text input
  const handleInputChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setPostText(e.target.value);
    }
  };

  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  // Handle the posting of new posts
  // const handlePostButtonClick = () => {
  //   if (currentPostIndex !== null) {
  //     const updatedPosts = [...displayedText];
  //     updatedPosts[currentPostIndex] = postText;
  //     setDisplayedText(updatedPosts);
  //     setCurrentPostIndex(null);
  //   } else {
  //     setDisplayedText([...displayedText, postText]);
  //     setReplies([...replies, []]);
  //   }
  //   setPostText("");
  // };
  const handlePostButtonClick = async () => {
    // Store the post text before clearing it
    const currentPostText = postText;

    if (currentPostIndex !== null) {
      const username = localStorage.getItem("username");
      const updatedPosts = [...displayedText];
      updatedPosts[currentPostIndex] = currentPostText; // Use the stored text
      setDisplayedText(updatedPosts);
      setCurrentPostIndex(null);
    } else {
      setDisplayedText([...displayedText, currentPostText]); // Use the stored text
      setReplies([...replies, []]);
    }
    setPostText("");

    try {
      // Use the stored text when making the POST or PUT request
      if (currentPostIndex === null) {
        const username = localStorage.getItem("username");
        await axios.post("http://localhost:8081/posts", {
          text: currentPostText,
          username: username, // Include the username in the request
        });
      } else {
        await axios.put(`http://localhost:8081/posts/${currentPostIndex}`, {
          text: currentPostText,
          username: username, // Include the username in the request
        });
      }
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };

  // Handle liking of posts
  const handleLikeClick = (index) => {
    const updatedLikedPosts = [...likedPosts];
    updatedLikedPosts[index] = !updatedLikedPosts[index];
    setLikedPosts(updatedLikedPosts);
  };

  // Handle bookmarking of posts
  const handleBookmarkClick = (index) => {
    const updatedBookmarkedPosts = [...bookmarkedPosts];
    displayedText.forEach((text, id) => {
      if (index === id) {
        if (updatedBookmarkedPosts[index]) {
          updatedBookmarkedPosts.splice(index, 1);
        } else {
          updatedBookmarkedPosts[index] = text;
        }
      }
    });
    setBookmarkedPosts(updatedBookmarkedPosts);
  };

  // Handle changes in the reply input
  const handleReplyTextChange = (index, text) => {
    const updatedReplyText = { ...replyText };
    updatedReplyText[index] = text;
    setReplyText(updatedReplyText);
  };

  // Handle submission of replies
  const handleReplySubmit = (index) => {
    if (replyText[index] && replyText[index].trim()) {
      const updatedReplies = [...replies];
      if (!updatedReplies[index]) {
        updatedReplies[index] = [];
      }
      updatedReplies[index].push(replyText[index].trim());
      setReplies(updatedReplies);
      setReplyText((prev) => ({ ...prev, [index]: "" }));
      setReplyingToPost(null); // Reset the reply state after submitting
    }
  };

  const handleReplyIconClick = (index) => {
    setReplyingToPost((prevIndex) => (prevIndex === index ? null : index));
  };
  // Handle editing of posts
  const handleEditClick = (index) => {
    setCurrentPostIndex(index);
    setPostText(displayedText[index]);
  };

  // Handle deletion of posts
  // const handleDeleteClick = (index) => {
  //   const updatedPosts = displayedText.filter((_, i) => i !== index);
  //   setDisplayedText(updatedPosts);
  //   setLikedPosts((prev) => prev.filter((_, i) => i !== index));
  //   setBookmarkedPosts((prev) => prev.filter((_, i) => i !== index));
  //   setReplies((prev) => prev.filter((_, i) => i !== index));
  // };
  const handleDeleteClick = async (index) => {
    // Send a request to your server to delete the post
    try {
      await axios.delete(`http://localhost:8081/posts/${index}`);
      // If the deletion is successful, update the state to remove the post
      const updatedPosts = displayedText.filter((_, i) => i !== index);
      setDisplayedText(updatedPosts);
      setLikedPosts((prev) => prev.filter((_, i) => i !== index));
      setBookmarkedPosts((prev) => prev.filter((_, i) => i !== index));
      setReplies((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const HomeStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: "10px",
  };
  const InputStyle = {
    width: "100%",
    marginLeft: "70px",
    marginTop: "20px",
    padding: "20px",
    outline: "none",
    border: "1px solid #ccc",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    boxSizing: "border-box",
  };

  const drop_btn_style = {
    margin: "2px",
    border: "none",
    outline: "none",
  };

  const btnStyle = {
    height: "60px",
    border: "none",
    marginRight: "10px",
    borderRadius: "0px",
    color: "white",
    cursor: "pointer",
    marginTop: "20px",
    alignSelf: "center",
  };

  const replyBox = {
    marginLeft: "70px",
  };

  const replyPstyle = {
    borderTop: "1px solid #eae7e7",
    padding: "10px",
  };
  return (
    <HomeParent>
      <HomeParentTitle style={HomeStyle}>
        <HomeClocks>
          <StyledIcon>9:41</StyledIcon>
        </HomeClocks>
        <HomeIcons>
          <StyledIcon>
            <SignalCellularAltIcon />
          </StyledIcon>
          <StyledIcon>
            <WifiIcon />
          </StyledIcon>
          <StyledIcon>
            <BatteryFullIcon />
          </StyledIcon>
        </HomeIcons>
      </HomeParentTitle>

      <HomePost>
        <UserIcon />
        <Input
          style={InputStyle}
          type="text"
          maxLength={maxLength}
          value={postText}
          onChange={handleInputChange}
          placeholder="What is the post text?"
        />
        <MaxLengthText $reached={Number(postText.length >= maxLength)}>
          {postText.length}/{maxLength}
        </MaxLengthText>
        <Button
          style={btnStyle}
          disabled={postText.length === 0}
          onClick={handlePostButtonClick}
        >
          {currentPostIndex !== null ? "Update" : "Post"}
        </Button>
      </HomePost>

      <PostContainer>
        {displayedText.map((text, index) => (
          <PostText key={index}>
            <PostUserContainer>
              <MeatBox>
                <UserIcon2 />
                <UserNiceNameContainer>{username}</UserNiceNameContainer>
              </MeatBox>
              <div style={{ position: "relative" }}>
                <HorizontalMeatballIcon onClick={() => toggleDropdown(index)} />
                {/* Position the CrudBtn absolutely */}
                {isDropdownOpen === index && (
                  <CrudBtn
                    id={`CrudElementBtn-${index}`}
                    style={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <button
                      style={drop_btn_style}
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                    <button
                      style={drop_btn_style}
                      onClick={() => handleDeleteClick(index)}
                    >
                      Delete
                    </button>
                  </CrudBtn>
                )}
              </div>
            </PostUserContainer>

            <PostTextContainer>{text}</PostTextContainer>

            <IconContainer>
              <StyledIconButton>
                <FavoriteIconStyle
                  onClick={() => handleLikeClick(index)}
                  style={{ color: likedPosts[index] ? "red" : "inherit" }}
                />
                <CommentIconStyle
                  onClick={() => handleReplyIconClick(index)}
                  style={{
                    color: replyingToPost === index ? "blue" : "inherit",
                  }}
                />
              </StyledIconButton>
              <BookmarkIconStyle
                onClick={() => handleBookmarkClick(index)}
                style={{ color: bookmarkedPosts[index] ? "blue" : "inherit" }}
              />
            </IconContainer>

            {/* Display replies */}
            <div style={replyBox}>
              {replies[index] &&
                replies[index].map((reply, replyIndex) => (
                  <div key={replyIndex}>
                    <p style={replyPstyle}>{reply}</p>
                  </div>
                ))}
            </div>

            {/* Reply input */}
            {replyingToPost === index && (
              <div style={replyBox}>
                <Input
                  type="text"
                  value={replyText[index] || ""}
                  onChange={(e) => handleReplyTextChange(index, e.target.value)}
                  placeholder="Write a reply..."
                />
                <Button onClick={() => handleReplySubmit(index)}>Reply</Button>
              </div>
            )}
          </PostText>
        ))}
      </PostContainer>
    </HomeParent>
  );
};

export default Home;
