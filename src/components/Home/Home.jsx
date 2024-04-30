import { useEffect, useState } from "react";

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

  const getUserId = () => {
    return localStorage.getItem("id");
  };

  const handlePostButtonClick = async () => {
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
      const user_id = getUserId();

      if (currentPostIndex === null) {
        const username = localStorage.getItem("username");
        await axios.post("http://localhost:8081/post", {
          text: currentPostText,
          user_id: user_id, // Include the username in the request
        });
      } else {
        await axios.put(`http://localhost:8081/post/${currentPostIndex}`, {
          text: currentPostText,
          user_id: user_id, // Include the username in the request
        });
      }
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };

  const handleLikeClick = (index) => {
    const updatedLikedPosts = [...likedPosts];
    updatedLikedPosts[index] = !updatedLikedPosts[index];
    setLikedPosts(updatedLikedPosts);

    // Show a notification
    if (updatedLikedPosts[index]) {
      showNotification("Liked!");
    } else {
      showNotification("Disliked!");
    }
  };

  const showNotification = (message) => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // If the permission is already granted, create a notification
      new Notification(message);
    } else if (Notification.permission !== "denied") {
      // Otherwise, request permission from the user
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
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
  const handleEditClick = (user_id) => {
    setCurrentPostIndex(user_id);
    setPostText(displayedText[user_id]);
  };

  const handleDeleteClick = async (user_id) => {
    // Send a request to your server to delete the post
    try {
      const user_id = getUserId();
      await axios.delete(`http://localhost:8081/post`);
      // If the deletion is successful, update the state to remove the post
      const updatedPosts = displayedText.filter((_, i) => i !== user_id);
      setDisplayedText(updatedPosts);
      setLikedPosts((prev) => prev.filter((_, i) => i !== user_id));
      setBookmarkedPosts((prev) => prev.filter((_, i) => i !== user_id));
      setReplies((prev) => prev.filter((_, i) => i !== user_id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const [posts, setPosts] = useState([]);

  const user_id = getUserId();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post("http://localhost:8081/posts", {
          params: {
            user_id: user_id,
          },
        });
        setPosts(response.data.posts);
        console.log(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

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
        {posts.map((post) => (
          <PostText key={post.id}>
            <PostUserContainer>
              <MeatBox>
                <UserIcon2 />
                <UserNiceNameContainer>{post.username}</UserNiceNameContainer>
              </MeatBox>
              <div style={{ position: "relative" }}>
                <HorizontalMeatballIcon
                  onClick={() => toggleDropdown(post.id)}
                />
                {/* Position the CrudBtn absolutely */}
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

            {/* Display replies */}
            <div style={replyBox}>
              {replies[post.id] &&
                replies[post.id].map((reply, replyIndex) => (
                  <div key={replyIndex}>
                    <p style={replyPstyle}>{reply}</p>
                  </div>
                ))}
            </div>

            {/* Reply input */}
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
