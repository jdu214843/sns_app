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
  ReplyBox,
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
  const [data, setData] = useState([]);

  const maxLength = 140;

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setPostText(e.target.value);
    }
  };

  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  // image

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

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
      const postsWithReplies = await Promise.all(
        response.data.posts.map(async (post) => {
          const response = await axios.get(
            `http://localhost:8081/comment/${post.id}`
          );
          post.replies = response.data.replies;
          return post;
        })
      );
      setPosts(postsWithReplies);
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

  const handleLikeClick = async (postId) => {
    try {
      const user_id = getUserId();
      const isLiked = likedPosts[postId]; // Check if the post is liked

      const response = isLiked
        ? await axios.post(`http://localhost:8081/like`, {
            user_id: user_id,
            post_id: postId,
            action: false,
          })
        : await axios.post(`http://localhost:8081/like`, {
            user_id: user_id,
            post_id: postId,
            action: true,
          });

      if (response.status === 200) {
        // If the request is successful, update the liked status in state
        setLikedPosts((prevLikedPosts) => ({
          ...prevLikedPosts,
          [postId]: !isLiked, // Toggle the like status
        }));
        console.log(
          `Post ${postId} ${isLiked ? "unliked" : "liked"} successfully`
        );
      } else {
        // Handle other response statuses, if needed
        console.error("Failed to toggle like: Unexpected status code");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleReplyIconClick = (postId, index) => {
    if (replyingToPost === postId) {
      // Close the reply box
      setReplyingToPost(null);
    } else {
      // Open the reply box for the post with postId
      setReplyingToPost(postId);
    }
    // Toggle dropdown for the post
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  const handleReplyTextChange = (postId, text) => {
    setReplyText((prevReplyText) => ({
      ...prevReplyText,
      [postId]: text,
    }));
  };

  const handleReplySubmit = async (postId) => {
    try {
      const response = await axios.post("http://localhost:8081/comment", {
        text: replyText[postId],
        post_id: postId,
        user_id: getUserId(),
      });

      if (response.status === 200) {
        fetchPosts(); // Call the fetchPosts function to update the list of posts
        setReplyText({ ...replyText, [postId]: "" }); // Clear the reply text input for the specific post
        setReplyingToPost(null); // Reset the replyingToPost state to null
      } else {
        console.error("Failed to add reply");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  // Function to handle clicking the bookmark icon
  const handleBookmarkClick = async (postId) => {
    try {
      const user_id = getUserId();
      const action = !bookmarkedPosts[postId]; // Toggle bookmark status

      const response = await axios.post("http://localhost:8081/bookmark", {
        user_id: user_id,
        post_id: postId,
        action: action,
      });

      if (response.status === 200) {
        // If the request is successful, update the bookmarked status in state
        setBookmarkedPosts((prevBookmarkedPosts) => ({
          ...prevBookmarkedPosts,
          [postId]: action, // Toggle the bookmark status
        }));
        console.log(
          `Post ${postId} ${
            action ? "bookmarked" : "unbookmarked"
          } successfully`
        );
      } else {
        // Handle other response statuses, if needed
        console.error("Failed to toggle bookmark: Unexpected status code");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const handleUnbookmark = async (postId) => {
    try {
      const user_id = getUserId();
      const response = await axios.post("http://localhost:8081/unbookmark", {
        user_id: user_id,
        post_id: postId,
        action: false, // Assuming you want to unbookmark the post
      });
      if (response.status === 200) {
        // Update local state to remove the unbookmarked post
        setBookmarkedPosts((prevBookmarkedPosts) => {
          const updatedBookmarkedPosts = { ...prevBookmarkedPosts };
          delete updatedBookmarkedPosts[postId]; // Remove the post from bookmarked posts
          return updatedBookmarkedPosts;
        });
        console.log("Post unbookmarked successfully");
      } else {
        console.error("Failed to unbookmark post: Unexpected status code");
      }
    } catch (error) {
      console.error("Error unbookmarking post:", error);
    }
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
    width: "100%",
  };

  const replyPstyle = {
    borderTop: "1px solid #000000",
  };

  const ImageStyle = {
    width: "100%",
    height: "100%",
    marginLeft: "5px",
    borderRadius: "50%",
  };
  const ImageStyle2 = {
    width: "30px",
    height: "30px",
    marginTop: "5px",
    marginLeft: "5px",
    borderRadius: "50%",
  };

  return (
    <HomeParent>
      <HomePost>
        <UserIcon>
          <div>
            <img
              style={ImageStyle}
              src={`http://localhost:8081/` + data.image}
              alt=""
            />
          </div>
        </UserIcon>
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
                  <img
                    style={ImageStyle2}
                    src={`http://localhost:8081/` + data.image}
                    alt=""
                  />

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
                  onClick={() =>
                    bookmarkedPosts[post.id]
                      ? handleUnbookmark(post.id)
                      : handleBookmarkClick(post.id)
                  }
                  style={{
                    color: bookmarkedPosts[post.id] ? "blue" : "inherit",
                  }}
                />
              </IconContainer>

              {/* Render replies */}
              <ReplyBox>
                {replyingToPost === post.id && (
                  <div style={replyBox}>
                    <div>
                      {Array.isArray(post.replies) &&
                        post.replies.map((reply, index) => (
                          <div key={index}>
                            <p style={replyPstyle}>{reply.text}</p>
                            {console.log(reply.text)}
                          </div>
                        ))}
                    </div>
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
              </ReplyBox>
            </PostText>
          ))}
      </PostContainer>
    </HomeParent>
  );
};

export default Home;
