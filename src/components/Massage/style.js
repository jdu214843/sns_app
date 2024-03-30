import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import BookmarkSignal from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
const MessagesIcon = styled.div`
  display: flex;
  font-weight: 600;
`;
const MessagesParentTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
`;
const MessagesClocks = styled.div``;
const MessagesTitle = styled.div`
  display: flex;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const MessagesH3 = styled.div`
  font-weight: 600;
  align-self: center;
  font-size: 28px;
  flex: 4;
  margin-left: 60px;
  @media (max-width: 375px) {
    margin-left: 50px;
  }
`;
const MessagesArrow = styled(ArrowLeftIcon)`
  color: black;
  align-self: center;
  flex: 1;
  font-size: 1em;
  margin-right: 10px;
`;
const MessagesSignal2 = styled(BookmarkSignal)`
  font-size: 1em;
`;
const MessagesWife2 = styled(WifiIcon)`
  font-size: 1em;
`;
const MessagesFull2 = styled(BatteryFullIcon)`
  font-size: 1em;
`;

export {
  MessagesClocks,
  MessagesIcon,
  MessagesParentTitle,
  MessagesTitle,
  MessagesArrow,
  MessagesH3,
  MessagesSignal2,
  MessagesFull2,
  MessagesWife2,
};
