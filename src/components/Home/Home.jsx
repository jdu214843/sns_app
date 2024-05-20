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

const Home = ({ bookmarkedPosts, setBookmarkedPosts }) => {
  const [postText, setPostText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [replyingToPost, setReplyingToPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const storedUsername = localStorage.getItem("username");
  const [replys, setReplys] = useState([]);

  const maxLength = 140;

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setPostText(e.target.value);
    }
  };

  const toggleDropdown = (postId) => {
    const storedUsername = localStorage.getItem("username");

    const post = posts.find((post) => post.id === postId);

    if (!post || storedUsername !== post.username) {
      // Do not perform any action if the post doesn't exist or if the stored username doesn't match the post's username.
      return;
    }

    setIsDropdownOpen(isDropdownOpen === postId ? null : postId);
  };

  const getUserId = () => {
    return localStorage.getItem("id");
  };

  useEffect(() => {
    const storedID = localStorage.getItem("id");

    axios
      .get(`http://localhost:8081/getUserData/`, {
        params: {
          id: storedID,
        },
      })
      .then((res) => {
        console.log("Response from server:", res.data);
        if (storedID && res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.log("Error fetching user data:", err));
  }, []);

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const handlePostButtonClick = async () => {
    const currentPostText = postText;

    if (currentPostIndex !== null) {
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
          const newPost = {
            id: response.data.post_id,
            text: newPostText,
            username: username,
          };

          setPosts([...posts, newPost]);

          setPostText("");
        } else {
          console.error("Error creating post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

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
          post.replies = response.data.comments;
          return post;
        })
      );
      setPosts(postsWithReplies);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Inside the handleFavoriteLike function

  const handleFavoriteLike = async (postId, action) => {
    try {
      const actionStatus = action === "true" ? false : true;

      const user_id = getUserId();
      const response = await axios.post("http://localhost:8081/like", {
        user_id: user_id,
        post_id: postId,
        action: actionStatus,
      });

      if (response.status === 200) {
        // Update likedPosts state based on the postId
        setLikedPosts((prevLikedPosts) => {
          if (prevLikedPosts.includes(postId)) {
            return prevLikedPosts.filter((id) => id !== postId); // If the post is already liked, remove it from the likedPosts
          } else {
            return [...prevLikedPosts, postId]; // If the post is not liked, add it to the likedPosts
          }
        });
      } else {
        console.log(
          "Server returned an unexpected status code:",
          response.status
        );
        // Handle other response statuses if needed
        if (response.status === 400) {
          // Handle bad request
        } else if (response.status === 401) {
          // Handle unauthorized access
        } else {
          // Handle other status codes
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error more gracefully if needed
    }
  };

  useEffect(() => {
    const likedPostIds = posts.reduce((acc, post) => {
      if (post.liked) {
        acc.push(post.id);
      }
      return acc;
    }, []);
    setLikedPosts(likedPostIds);
  }, [posts]);

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
        setBookmarkedPosts((prevBookmarkedPosts) => ({
          ...prevBookmarkedPosts,
          [postId]: action,
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
        action: false,
      });
      if (response.status === 200) {
        setBookmarkedPosts((prevBookmarkedPosts) => {
          const updatedBookmarkedPosts = { ...prevBookmarkedPosts };
          delete updatedBookmarkedPosts[postId];
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

  // Function to handle editing a post
  const handleEditClick = (postId) => {
    const index = posts.findIndex((post) => post.id === postId);

    const postText = posts[index].text;

    setPostText(postText);

    setCurrentPostIndex(index);
  };

  // Function to handle deleting a post
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

  // Function to handle clicking the reply icon
  const handleReplyIconClick = (postId, index) => {
    if (replyingToPost === postId) {
      setReplyingToPost(null);
    } else {
      setReplyingToPost(postId);
    }

    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  // Function to handle changing reply text
  const handleReplyTextChange = (postId, text) => {
    setReplyText((prevReplyText) => ({
      ...prevReplyText,
      [postId]: text,
    }));
  };

  const handleEditReply = () => {};

  // Function to submit a reply
  const handleReplySubmit = async (postId) => {
    try {
      const user_id = getUserId();
      const replyContent = replyText[postId];
      const isNewComment = !(postId in replys); // Check if postId is not in replys state, indicating it's a new comment

      if (isNewComment) {
        // Creating a new comment
        const response = await axios.post("http://localhost:8081/comment", {
          text: replyContent,
          post_id: postId,
          user_id: user_id,
        });

        if (response.status === 200) {
          fetchPosts(); // Update the list of posts
          setReplyText({ ...replyText, [postId]: "" }); // Clear the reply text input
          setReplyingToPost(null); // Reset the replyingToPost state
        } else {
          console.error("Failed to add reply");
        }
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  // Function to handle deleting a reply
  const handleDeleteReply = async (commentId) => {
    try {
      const user_id = getUserId();
      const response = await axios.delete("http://localhost:8081/comment", {
        data: { comment_id: commentId, user_id: user_id },
      });
      if (response.status === 200) {
        fetchPosts();
        console.log("Reply deleted successfully");
      } else {
        console.error("Failed to delete reply");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
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
  };

  const replyPstyle = {
    borderTop: "1px solid #ccc",
    paddingTop: "20px",
    paddingBottom: "20px",
    fontSize: "16px",
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

  const editParent = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const replyInputStyle = {
    marginBottom: "10px",
  };

  const replyPstyle2 = {
    marginLeft: "10px",
    marginBottom: "10px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ccc",
  };

  return (
    <HomeParent>
      <HomePost>
        <UserIcon>
          <div>
            {data.image && (
              <img
                style={ImageStyle}
                src={`http://localhost:8081/` + data.image}
                alt="Profile"
              />
            )}
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
                  {data.image && (
                    <img
                      style={ImageStyle2}
                      src={`http://localhost:8081/` + post.image}
                      alt="Profile"
                    />
                  )}
                  <UserNiceNameContainer>{post.username}</UserNiceNameContainer>
                </MeatBox>
                <div style={{ position: "relative" }}>
                  {storedUsername === post.username && ( // Check if the stored username matches the post's username
                    <HorizontalMeatballIcon
                      onClick={() => toggleDropdown(post.id)}
                    />
                  )}
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
                    onClick={() => handleFavoriteLike(post.id)}
                    style={{
                      color: likedPosts.includes(post.id) ? "red" : "inherit",
                    }}
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
                    display:
                      bookmarkedPosts[post.id] === null ? "blue" : "inherit",
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
                          <div key={index} style={editParent}>
                            <div>
                              <MeatBox style={replyPstyle}>
                                {data.image && (
                                  <img
                                    style={ImageStyle2}
                                    src={`http://localhost:8081/${reply.commenter_image}`}
                                    alt="Profile"
                                  />
                                )}
                                <UserNiceNameContainer>
                                  {reply.commenter_username}
                                </UserNiceNameContainer>
                                <div>
                                  <>
                                    <button onClick={() => handleEditReply()}>
                                      Edit
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteReply(reply.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </>
                                </div>
                              </MeatBox>
                              <p style={replyPstyle2}>{reply.text}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div>
                      <Input
                        style={replyInputStyle}
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
