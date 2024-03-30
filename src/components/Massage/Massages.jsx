import React from "react";

import { StyledIcon } from "../Style/StyledBottomNavigationAction";

import {
  MessagesClocks,
  MessagesIcon,
  MessagesParentTitle,
  MessagesTitle,
  MessagesArrow,
  MessagesH3,
  MessagesSignal2,
  MessagesFull2,
  MessagesWife2,
} from "./style";
const Massages = () => {
  return (
    <div>
      <MessagesParentTitle>
        <MessagesClocks>
          <StyledIcon>9:41</StyledIcon>
        </MessagesClocks>
        <MessagesIcon>
          <StyledIcon>
            <MessagesSignal2 />
          </StyledIcon>
          <StyledIcon>
            <MessagesWife2 />
          </StyledIcon>
          <StyledIcon>
            <MessagesFull2 />
          </StyledIcon>
        </MessagesIcon>
      </MessagesParentTitle>
      <MessagesTitle>
        <MessagesArrow />
        <MessagesH3>Messages</MessagesH3>
      </MessagesTitle>
    </div>
  );
};

export default Massages;
