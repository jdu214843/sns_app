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

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const handlePostButtonClick = async () => {
    const currentPostText = postText;

    if (currentPostIndex !== null) {
      // If currentPostIndex is not null, it means we're editing an existing post
      try {
        const user_id = getUserId();
        const postIdToUpdate = posts[currentPostIndex].id;
        await axios.put(`http://localhost:8081/post/${postIdToUpdate}`, {
          text: currentPostText,
          user_id: user_id,
        });

        // Update the post text in the local state
        const updatedPosts = [...posts];
        updatedPosts[currentPostIndex].text = currentPostText;
        setPosts(updatedPosts);

        // Clear the post text and currentPostIndex state
        setPostText("");
        setCurrentPostIndex(null);
      } catch (error) {
        console.error("Error while updating post:", error);
      }
    } else {
      const user_id = getUserId();
      const newPostText = postText;

      try {
        const response = await axios.post("http://localhost:8081/post", {
          text: newPostText,
          user_id: user_id,
        });

        if (response.status === 200) {
          // Post creation successful
          const newPost = {
            id: response.data.post_id,
            text: newPostText,
            username: username,
          };

          setPosts([...posts, newPost]);

          // Clear the post text
          setPostText("");
        } else {
          // Post creation failed
          console.error("Error creating post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  // Fetch all posts

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.post("http://localhost:8081/posts", {
        user_id: getUserId(),
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function placeholders
  const handleEditClick = (postId) => {
    // Find the index of the post in the array
    const index = posts.findIndex((post) => post.id === postId);
    // Get the post text
    const postText = posts[index].text;
    // Set the post text in the input field for editing
    setPostText(postText);
    // Set the current post index for tracking which post is being edited
    setCurrentPostIndex(index);
  };

  const handleDeleteClick = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/post/${postId}`,
        {
          params: {
            user_id: getUserId(),
          },
        }
      );
      if (response.status === 200) {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
        {posts &&
          posts.map((post, index) => (
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
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                      }}
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
                  style={{
                    color: bookmarkedPosts[post.id] ? "blue" : "inherit",
                  }}
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
