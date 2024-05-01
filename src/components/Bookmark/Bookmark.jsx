import React, { useState } from "react";
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

  const handleUnbookmark = (index) => {
    const updatedBookmarkedPosts = [...bookmarkedPosts];
    updatedBookmarkedPosts.splice(index, 1);
    setBookmarkedPosts(updatedBookmarkedPosts);
  };

  return (
    <BookmarkParent>
      <BookmarkTitle>
        <BookmarkArrow />
        <BookmarkH3>Bookmarks</BookmarkH3>
      </BookmarkTitle>

      <BookmarkParentChild>
        {bookmarkedPosts ? (
          bookmarkedPosts.map((post, index) => {
            if (post && post.id) {
              return (
                <PostUserContainer key={post.id}>
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
                      <BookPost>{post.text}</BookPost>
                      <button
                        style={{
                          marginRight: "10px",
                          marginLeft: "10px",
                          height: "40px",
                          alignSelf: "center",
                        }}
                        onClick={() => handleUnbookmark(index)}
                      >
                        <DeleteIcon1 />
                      </button>
                    </div>
                  </MetBookmark>
                </PostUserContainer>
              );
            } else {
              return null;
            }
          })
        ) : (
          <p>No bookmarks yet.</p>
        )}
      </BookmarkParentChild>
    </BookmarkParent>
  );
};

export default Bookmark;
