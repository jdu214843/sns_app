import styled from "styled-components";
import { BottomNavigationAction } from "@mui/material";
import { BottomNavigation } from "@mui/material";

// StyledBottomNavigationAction ni yaratish
const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  && {
    color: white;
    background-color: #24786d;
    font-size: 16px;
    width: 100%;
    display: flex;
  }
`;

const BottomNavigationParent = styled(BottomNavigation)`
  width: 100%;
`;

const StyledIcon = styled.div`
  font-size: 1em;
`;

export { StyledBottomNavigationAction, StyledIcon, BottomNavigationParent };
