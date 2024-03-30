import React, { useState } from "react";
import { StyledIcon } from "../Style/StyledBottomNavigationAction";
import {
  HomeClocks,
  HomeParent,
  HomePost,
  HomeParentTitle,
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
} from "./style";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";

const Home = () => {
  const [postText, setPostText] = useState("");
  const maxLength = 140;
  const [displayedText, setDisplayedText] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [BookMarkPosts, setBookMarkPosts] = useState([]);

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setPostText(e.target.value);
    }
  };

  const handlePostButtonClick = () => {
    setDisplayedText([...displayedText, postText]);
    setPostText("");
  };

  const handleLikeClick = (index) => {
    if (likedPosts[index]) {
      const updatedLikedPosts = [...likedPosts];
      updatedLikedPosts[index] = false;
      setLikedPosts(updatedLikedPosts);

      showNotification("Disliked");
    } else {
      const updatedLikedPosts = [...likedPosts];
      updatedLikedPosts[index] = true;
      setLikedPosts(updatedLikedPosts);

      showNotification("Liked");
    }
  };

  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.classList.add("notification");

    document.body.appendChild(notification);

    notification.getBoundingClientRect();

    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 1000);
  };

  const handleBookMarkClick = (index) => {
    const updatedBookmarkedPosts = [...BookMarkPosts];
    updatedBookmarkedPosts[index] = !updatedBookmarkedPosts[index];
    setBookMarkPosts(updatedBookmarkedPosts);
  };

  return (
    <HomeParent>
      <HomeParentTitle>
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
          type="text"
          maxLength={maxLength}
          value={postText}
          onChange={handleInputChange}
          placeholder="What is the post text?"
        />
        <MaxLengthText reached={Number(postText.length >= maxLength)}>
          {postText.length}/{maxLength}
        </MaxLengthText>
        <Button
          disabled={postText.length === 0}
          onClick={handlePostButtonClick}
        >
          Post
        </Button>
      </HomePost>
      <PostContainer>
        {displayedText.map((text, index) => (
          <PostText key={index}>
            <PostUserContainer>
              <MeatBox>
                <UserIcon2 />
                <UserNiceNameContainer>Asilbek Boysoatov</UserNiceNameContainer>
              </MeatBox>
              <HorizontalMeatballIcon />
            </PostUserContainer>
            <PostTextContainer>{text}</PostTextContainer>
            <IconContainer>
              <StyledIconButton>
                <FavoriteIconStyle
                  onClick={() => handleLikeClick(index)}
                  style={{ color: likedPosts[index] ? "red" : "inherit" }}
                />
                <CommentIconStyle />
              </StyledIconButton>
              <BookmarkIconStyle
                onClick={() => handleBookMarkClick(index)}
                style={{ color: BookMarkPosts[index] ? "blue" : "inherit" }}
              />
            </IconContainer>
          </PostText>
        ))}
      </PostContainer>
    </HomeParent>
  );
};

export default Home;
