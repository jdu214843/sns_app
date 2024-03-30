import React from "react";

import { StyledIcon } from "../Style/StyledBottomNavigationAction";
import { handleLastPage } from "../utils/hooks";
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
const Bookmark = () => {
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
        <BookmarkArrow onClick={handleLastPage} />
        <BookmarkH3>Bookmarks</BookmarkH3>
      </BookmarkTitle>
    </div>
  );
};

export default Bookmark;
