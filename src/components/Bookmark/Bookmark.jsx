import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BookmarkTitle,
  BookmarkArrow,
  BookmarkH3,
  MetBookmark,
  UserNiceParent,
  BookPost,
  DeleteIcon1,
  BookmarkParentChild,
  BookmarkParent,
} from "./style";
import {
  PostUserContainer,
  UserIcon2,
  UserNiceNameContainer,
} from "../Home/style";

const getUserId = () => {
  return localStorage.getItem("id");
};

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Function to fetch bookmarks from the server
  const fetchBookmarks = async () => {
    try {
      const user_id = getUserId();
      const response = await axios.post("http://localhost:8081/myBookmark", {
        user_id,
      });
      if (response.status === 200) {
        setBookmarks(response.data.posts);
      } else {
        console.error("Failed to fetch bookmarks: Unexpected status code");
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  // unbookmarks
  const handleUnbookmark = async (postId) => {
    try {
      const user_id = getUserId();
      const response = await axios.post("http://localhost:8081/unbookmark", {
        user_id: user_id,
        post_id: postId,
        action: false,
      });
      if (response.status === 200) {
        setBookmarks((prevBookmarks) => {
          return prevBookmarks.filter((bookmark) => bookmark.id !== postId);
        });
        console.log("Post unbookmarked successfully");
      } else {
        console.error("Failed to unbookmark post: Unexpected status code");
      }
    } catch (error) {
      console.error("Error unbookmarking post:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const BookmarkLineStyle = {
    display: "flex",
    flexdirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    paddingBottom: "20px",
  };
  return (
    <BookmarkParent>
      <BookmarkTitle>
        <BookmarkArrow />
        <BookmarkH3>Bookmarks</BookmarkH3>
      </BookmarkTitle>
      {bookmarks && bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <BookmarkParentChild key={bookmark.id}>
            <PostUserContainer>
              <MetBookmark>
                <UserNiceParent>
                  <UserIcon2 />
                  <UserNiceNameContainer>
                    {bookmark.username}
                  </UserNiceNameContainer>
                </UserNiceParent>
                <div style={BookmarkLineStyle}>
                  <BookPost>{bookmark.text}</BookPost>
                  <button
                    style={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      height: "40px",
                      alignSelf: "center",
                    }}
                    onClick={() => handleUnbookmark(bookmark.id)}
                  >
                    <DeleteIcon1 />
                  </button>
                </div>
              </MetBookmark>
            </PostUserContainer>
          </BookmarkParentChild>
        ))
      ) : (
        <p>No bookmarks found.</p>
      )}
    </BookmarkParent>
  );
};

export default Bookmark;
