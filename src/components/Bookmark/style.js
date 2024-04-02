import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import BookmarkSignal from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
const BookmarkIcon = styled.div`
  display: flex;
  font-weight: 600;
`;
const BookmarkParentTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  /* background-color: red; */
`;

const BookmarkClocks = styled.div``;
const BookmarkTitle = styled.div`
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const BookmarkH3 = styled.div`
  font-weight: 600;
  align-self: center;
  font-size: 28px;
  text-align: center;
`;
const BookmarkArrow = styled(ArrowLeftIcon)`
  color: #fff;
  align-self: center;
  background-color: #24786d;
  border-radius: 50%;
  font-size: 1em;
  margin-left: 20px;
`;
const BookmarkSignal2 = styled(BookmarkSignal)`
  font-size: 1em;
`;
const BookmarkWife2 = styled(WifiIcon)`
  font-size: 1em;
`;
const BookmarkFull2 = styled(BatteryFullIcon)`
  font-size: 1em;
`;

export {
  BookmarkIcon,
  BookmarkParentTitle,
  BookmarkClocks,
  BookmarkTitle,
  BookmarkArrow,
  BookmarkH3,
  BookmarkSignal2,
  BookmarkWife2,
  BookmarkFull2,
};
