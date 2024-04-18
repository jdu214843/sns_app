import React from "react";

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
} from "./style";

const Bookmark = ({ bookmarkedPosts, setBookmarkedPosts }) => {
  const handleUnbookmark = (index) => {
    const updatedBookmarkedPosts = [...bookmarkedPosts];
    updatedBookmarkedPosts.splice(index, 1);
    setBookmarkedPosts(updatedBookmarkedPosts);
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
              <p>{post}</p>

              <button onClick={() => handleUnbookmark(index)}>
                Unbookmark
              </button>
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
