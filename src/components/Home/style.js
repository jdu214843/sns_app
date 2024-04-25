import styled from "styled-components";
import { IconButton, linearProgressClasses } from "@mui/material";
import MeatballIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
const HomeParent = styled.div`
  width: 100%;
  height: 100%;
`;
const HomeParentTitle = styled.div``;
const HomePost = styled.div`
  display: flex;
  position: relative;
`;
const Input = styled.input``;

const Button = styled.button``;

const MaxLengthText = styled.span`
  font-size: 10px;
  color: ${(props) => (props.reached ? "red" : "gray")};
  position: absolute;
  left: 75px;
  top: 10px;
`;

const HomeIcons = styled.div`
  display: flex;
  font-weight: 600;
`;

const HomeClocks = styled.div``;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #ffc746;
  border-radius: 50%;
  position: absolute;
  top: 30px;
  left: 15px;
`;
const HomeSection = styled.div`
  width: 100%;
  height: 100%;
`;
const PostContainer = styled.div`
  margin-top: 20px;
`;
const PostText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-top: 20px;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: 40px;
  margin-right: 20px;
  outline: none;
`;
const UserIcon2 = styled.div`
  width: 25px;
  height: 25px;
  background: #ffc746;
  border-radius: 50%;
  margin-left: 10px;
  display: flex;
  justify-content: center;

  align-self: center;
`;
const StyledIconButton = styled.div`
  color: #555;
`;
const PostTextContainer = styled.div`
  font-size: 18px;
  padding: 10px 40px;
`;

const PostUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const UserNiceNameContainer = styled.div`
  font-size: 16px;
  font-weight: 800;
  font-style: bold;
  padding-left: 5px;
  display: flex;
  justify-content: center;

  align-self: center;
`;

const HorizontalMeatballIcon = styled(MeatballIcon)({
  transform: "rotate(-90deg)",
  marginRight: "15px",
  border: "1px solid #ccc",
  borderRadius: "16px",
  cursor: "pointer", // Add cursor pointer to indicate it's clickable
  "&:hover": {
    transition: "all .3s ease",
    color: "#fff",
    backgroundColor: "gray", // Change background color on hover
  },
});

const CrudBtn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
`;
const MeatBox = styled.div`
  display: flex;
`;
const FavoriteIconStyle = styled(FavoriteIcon)({
  marginRight: "10px",
});
const CommentIconStyle = styled(CommentIcon)({});
const BookmarkIconStyle = styled(BookmarkIcon)({
  alignItems: "end",
});

export {
  HomeParent,
  Input,
  Button,
  HomePost,
  HomeClocks,
  HomeParentTitle,
  HomeIcons,
  MaxLengthText,
  UserIcon,
  HomeSection,
  PostContainer,
  PostText,
  IconContainer,
  StyledIconButton,
  UserIcon2,
  PostTextContainer,
  PostUserContainer,
  UserNiceNameContainer,
  HorizontalMeatballIcon,
  MeatBox,
  FavoriteIconStyle,
  CommentIconStyle,
  BookmarkIconStyle,
  CrudBtn,
};
