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

  const handleLikeClick = (index) => {
    const updatedLikedPosts = [...likedPosts];
    updatedLikedPosts[index] = !updatedLikedPosts[index];
    setLikedPosts(updatedLikedPosts);

    if (updatedLikedPosts[index]) {
      showNotification("Liked!");
    } else {
      showNotification("Disliked!");
    }
  };

  const showNotification = (message) => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  };

  const handleBookmarkClick = async (index) => {
    try {
      const user_id = getUserId();
      const post_id = index;

      const action = bookmarkedPosts[index] ? "false" : "true";

      const response = await axios.post("http://localhost:8081/bookmark", {
        user_id: user_id,
        post_id: post_id,
        action: action,
      });

      if (response.status === 200) {
        const updatedBookmarkedPosts = [...bookmarkedPosts];
        if (action === "true") {
          updatedBookmarkedPosts[index] = displayedText[index];
        } else {
          delete updatedBookmarkedPosts[index];
        }
        setBookmarkedPosts(updatedBookmarkedPosts);
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
      // Handle error if needed
    }
  };

  const handleReplyTextChange = (index, text) => {
    const updatedReplyText = { ...replyText };
    updatedReplyText[index] = text;
    setReplyText(updatedReplyText);
  };

  const handleReplySubmit = (index) => {
    if (replyText[index] && replyText[index].trim()) {
      const updatedReplies = [...replies];
      if (!updatedReplies[index]) {
        updatedReplies[index] = [];
      }
      updatedReplies[index].push(replyText[index].trim());
      setReplies(updatedReplies);
      setReplyText((prev) => ({ ...prev, [index]: "" }));
      setReplyingToPost(null);
    }
  };

  const handleReplyIconClick = (index) => {
    setReplyingToPost((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEditClick = async (post_id) => {
    try {
      const user_id = getUserId();
      const newText = postText;

      await axios.put("http://localhost:8081/post", {
        user_id: user_id,
        post_id: post_id,
        text: newText,
      });

      const updatedPosts = displayedText.map((post, index) => {
        if (index === post_id) {
          return newText;
        }
        return post;
      });
      setDisplayedText(updatedPosts);
      setPostText("");
      setCurrentPostIndex(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeleteClick = async (post_id) => {
    try {
      const user_id = getUserId();
      await axios.delete(`http://localhost:8081/post`, {
        data: { post_id, user_id },
      });

      const updatedPosts = posts.filter((post) => post.id !== post_id);
      setPosts(updatedPosts);
      setLikedPosts((prev) => prev.filter((_, i) => i !== post_id));
      setBookmarkedPosts((prev) => prev.filter((_, i) => i !== post_id));
      setReplies((prev) => prev.filter((_, i) => i !== post_id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

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
