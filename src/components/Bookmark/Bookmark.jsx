import React, { useState } from "react";
import { StyledIcon } from "../Style/StyledBottomNavigationAction";
import {
  BookmarkClocks,
  BookmarkIcon,
  BookmarkParentTitle,
  BookmarkTitle,
  BookmarkArrow,
  BookmarkH3,
  BookmarkSignal2,
  BookmarkFull2,
  BookmarkWife2,
  MetBookmark,
  UserNiceParent,
  BookPost,
  DeleteIcon1,
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
    <div>
      <BookmarkParentTitle>
        <BookmarkClocks>
          <StyledIcon>9:41</StyledIcon>
        </BookmarkClocks>
        <BookmarkIcon>
          <StyledIcon>
            <BookmarkSignal2 />
          </StyledIcon>
          <StyledIcon>
            <BookmarkWife2 />
          </StyledIcon>
          <StyledIcon>
            <BookmarkFull2 />
          </StyledIcon>
        </BookmarkIcon>
      </BookmarkParentTitle>
      <BookmarkTitle>
        <BookmarkArrow />
        <BookmarkH3>Bookmarks</BookmarkH3>
      </BookmarkTitle>

      <div>
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
      </div>
    </div>
  );
};

export default Bookmark;
