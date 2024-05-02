import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HomeParent,
  HomePost,
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
  const [posts, setPosts] = useState([]);

  const maxLength = 140;

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setPostText(e.target.value);
    }
  };

  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  const getUserId = () => {
    return localStorage.getItem("id");
  };

  const handlePostButtonClick = async () => {
    const currentPostText = postText;

    if (currentPostIndex !== null) {
      const updatedPosts = [...displayedText];
      updatedPosts[currentPostIndex] = currentPostText;
      setDisplayedText(updatedPosts);
      setCurrentPostIndex(null);
    } else {
      setDisplayedText([...displayedText, currentPostText]);
      setReplies([...replies, []]);
    }
    setPostText("");

    try {
      const user_id = getUserId();
      let responseData;

      if (currentPostIndex === null) {
        const response = await axios.post("http://localhost:8081/post", {
          text: currentPostText,
          user_id: user_id,
        });
        responseData = response.data;
      } else {
        await axios.put(`http://localhost:8081/post/${currentPostIndex}`, {
          text: currentPostText,
          user_id: user_id,
        });
        return;
      }

      setPosts((prevPosts) => [...prevPosts, responseData]);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };

  // Fetch all posts
  useEffect(() => {
    const user_id = getUserId();
    const fetchPosts = async () => {
      try {
        const response = await axios.post("http://localhost:8081/posts", {
          params: {
            user_id: user_id,
          },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Function placeholders
  const handleEditClick = (postId) => {
    // Implement edit logic here
  };

  const handleDeleteClick = (postId) => {
    // Implement delete logic here
  };

  const handleLikeClick = (postId) => {
    // Implement like logic here
  };

  const handleReplyIconClick = (postId) => {
    // Implement reply icon click logic here
  };

  const handleBookmarkClick = (postId) => {
    // Implement bookmark logic here
  };

  const handleReplyTextChange = (postId, text) => {
    // Implement reply text change logic here
  };

  const handleReplySubmit = (postId) => {
    // Implement reply submit logic here
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
        <MaxLengthText reached={Number(postText.length >= maxLength)}>
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
        {posts.map((post, index) => (
          <PostText key={index}>
            <PostUserContainer>
              <MeatBox>
                <UserIcon2 />
                <UserNiceNameContainer>{post.username}</UserNiceNameContainer>
              </MeatBox>
              <div style={{ position: "relative" }}>
                <HorizontalMeatballIcon
                  onClick={() => toggleDropdown(post.id)}
                />
                {isDropdownOpen === post.id && (
                  <CrudBtn
                    id={`CrudElementBtn-${post.id}`}
                    style={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <button
                      style={drop_btn_style}
                      onClick={() => handleEditClick(post.id)}
                    >
                      Edit
                    </button>

                    <button
                      style={drop_btn_style}
                      onClick={() => handleDeleteClick(post.id)}
                    >
                      Delete
                    </button>
                  </CrudBtn>
                )}
              </div>
            </PostUserContainer>

            <PostTextContainer>{post.text}</PostTextContainer>

            <IconContainer>
              <StyledIconButton>
                <FavoriteIconStyle
                  onClick={() => handleLikeClick(post.id)}
                  style={{ color: likedPosts[post.id] ? "red" : "inherit" }}
                />
                <CommentIconStyle
                  onClick={() => handleReplyIconClick(post.id)}
                  style={{
                    color: replyingToPost === post.id ? "blue" : "inherit",
                  }}
                />
              </StyledIconButton>
              <BookmarkIconStyle
                onClick={() => handleBookmarkClick(post.id)}
                style={{ color: bookmarkedPosts[post.id] ? "blue" : "inherit" }}
              />
            </IconContainer>

            <div style={replyBox}>
              {replies[post.id] &&
                replies[post.id].map((reply, replyIndex) => (
                  <div key={replyIndex}>
                    <p style={replyPstyle}>{reply}</p>
                  </div>
                ))}
            </div>

            {replyingToPost === post.id && (
              <div style={replyBox}>
                <Input
                  type="text"
                  value={replyText[post.id] || ""}
                  onChange={(e) =>
                    handleReplyTextChange(post.id, e.target.value)
                  }
                  placeholder="Write a reply..."
                />
                <Button onClick={() => handleReplySubmit(post.id)}>
                  Reply
                </Button>
              </div>
            )}
          </PostText>
        ))}
      </PostContainer>
    </HomeParent>
  );
};

export default Home;
