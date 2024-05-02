import React, { useEffect, useState } from "react";
import { StyledIcon } from "../Style/StyledBottomNavigationAction";
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

const Bookmark = ({ bookmarkedPosts, setBookmarkedPosts }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const handleUnbookmark = (post_id) => {
    setBookmarkedPosts((prevBookmarkedPosts) =>
      prevBookmarkedPosts.filter((post) => post.id !== post_id)
    );
  };

  // Filter out only bookmarked posts
  const bookmarkedPostsToShow = bookmarkedPosts.filter(
    (post) => post.bookmarked
  );

 
  return (
    <BookmarkParent>
      <BookmarkTitle>
        <BookmarkArrow />
        <BookmarkH3>Bookmarks</BookmarkH3>
      </BookmarkTitle>

      <BookmarkParentChild>
        {bookmarkedPostsToShow.length > 0 &&
          bookmarkedPostsToShow.map((bookmarkedPost) => (
            <PostUserContainer key={bookmarkedPost.id}>
              <MetBookmark>
                <UserNiceParent>
                  <UserIcon2 />
                  <UserNiceNameContainer>{username}</UserNiceNameContainer>
                </UserNiceParent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <BookPost>{bookmarkedPost.text}</BookPost>
                  <button
                    style={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      height: "40px",
                      alignSelf: "center",
                    }}
                    onClick={() => handleUnbookmark(bookmarkedPost.id)}
                  >
                    <DeleteIcon1 />
                  </button>
                </div>
              </MetBookmark>
            </PostUserContainer>
          ))}
      </BookmarkParentChild>
    </BookmarkParent>
  );
};

export default Bookmark;
