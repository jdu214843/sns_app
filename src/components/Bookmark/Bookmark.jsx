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

  const buttonParent = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const BtnBookMarkStyle = {
    marginRight: "10px",
    marginLeft: "10px",
    height: "40px",

    alignSelf: "center",
  };

  return (
    <BookmarkParent>
      <BookmarkTitle>
        <BookmarkArrow />
        <BookmarkH3>Bookmarks</BookmarkH3>
      </BookmarkTitle>

      <BookmarkParentChild>
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((post, index) => (
            <div key={index}>
              <PostUserContainer>
                <MetBookmark>
                  <UserNiceParent>
                    <UserIcon2 />
                    <UserNiceNameContainer>{username}</UserNiceNameContainer>
                  </UserNiceParent>

                  <div style={buttonParent}>
                    <BookPost>{post}</BookPost>
                    <button
                      style={BtnBookMarkStyle}
                      onClick={() => handleUnbookmark(index)}
                    >
                      <DeleteIcon1 />
                    </button>
                  </div>
                </MetBookmark>
              </PostUserContainer>
            </div>
          ))
        ) : (
          <p>No bookmarks yet.</p>
        )}
      </BookmarkParentChild>
    </BookmarkParent>
  );
};

export default Bookmark;
