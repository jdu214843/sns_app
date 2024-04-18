import { StyledIcon } from "../Style/StyledBottomNavigationAction";
import React, { useState } from "react";
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
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [displayedText, setDisplayedText] = useState([]);
  const [replies, setReplies] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [replyingToPost, setReplyingToPost] = useState(null); // New state for tracking reply state

  const maxLength = 140;

  // Handle changes in the post text input
  const handleInputChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setPostText(e.target.value);
    }
  };

  // Handle the posting of new posts
  const handlePostButtonClick = () => {
    if (currentPostIndex !== null) {
      const updatedPosts = [...displayedText];
      updatedPosts[currentPostIndex] = postText;
      setDisplayedText(updatedPosts);
      setCurrentPostIndex(null);
    } else {
      setDisplayedText([...displayedText, postText]);
      setReplies([...replies, []]); // Initialize a new replies array for the new post
    }
    setPostText("");
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
    updatedBookmarkedPosts[index] = !updatedBookmarkedPosts[index];
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

  // Handle editing of posts
  const handleEditClick = (index) => {
    setCurrentPostIndex(index);
    setPostText(displayedText[index]);
  };

  // Handle deletion of posts
  const handleDeleteClick = (index) => {
    const updatedPosts = displayedText.filter((_, i) => i !== index);
    setDisplayedText(updatedPosts);
    setLikedPosts((prev) => prev.filter((_, i) => i !== index));
    setBookmarkedPosts((prev) => prev.filter((_, i) => i !== index));
    setReplies((prev) => prev.filter((_, i) => i !== index));
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
                <UserNiceNameContainer>Username</UserNiceNameContainer>
              </MeatBox>
              <HorizontalMeatballIcon
                onClick={() => {
                  const CrudElement = document.getElementById(
                    `CrudElementBtn-${index}`
                  );
                  CrudElement.style.display =
                    CrudElement.style.display === "none" ? "block" : "none";
                }}
              />
              <CrudBtn
                id={`CrudElementBtn-${index}`}
                style={{ display: "none" }}
              >
                <button onClick={() => handleEditClick(index)}>Edit</button>
                <button onClick={() => handleDeleteClick(index)}>Delete</button>
              </CrudBtn>
            </PostUserContainer>

            <PostTextContainer>{text}</PostTextContainer>

            <IconContainer>
              <StyledIconButton>
                <FavoriteIconStyle
                  onClick={() => handleLikeClick(index)}
                  style={{ color: likedPosts[index] ? "red" : "inherit" }}
                />
                {/* Toggle reply input on CommentIconStyle click */}
                <CommentIconStyle onClick={() => setReplyingToPost(index)} />
              </StyledIconButton>
              <BookmarkIconStyle
                onClick={() => handleBookmarkClick(index)}
                style={{ color: bookmarkedPosts[index] ? "blue" : "inherit" }}
              />
            </IconContainer>

            {/* Display replies */}
            <div>
              {replies[index] &&
                replies[index].map((reply, replyIndex) => (
                  <div key={replyIndex}>
                    <p>{reply}</p>
                  </div>
                ))}
            </div>

            {/* Reply input */}
            {replyingToPost === index && (
              <div>
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
