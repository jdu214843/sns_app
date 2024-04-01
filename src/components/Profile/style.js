import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import BookmarkSignal from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
const ProfileIcon = styled.div`
  display: flex;
  font-weight: 600;
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ProfileParentTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  background-color: gray !important;
  color: white !important;
`;
const ProfileClocks = styled.div``;
const ProfileTitle = styled.div`
  display: flex;
  padding-top: 20px;

  background-color: gray;
  color: white !important;
`;
const ProfileH3 = styled.div`
  font-weight: 600;
  align-self: center;
  font-size: 28px;
  flex: 4;
  margin-left: 95px;
  @media (max-width: 375px) {
    margin-left: 77px;
  }
`;
const ProfileArrow = styled(ArrowLeftIcon)`
  color: white !important;
  align-self: center;
  flex: 1;
  font-size: 1em;
  margin-right: 10px;
`;
const ProfileSignal2 = styled(BookmarkSignal)`
  font-size: 1em;
`;
const ProfileWife2 = styled(WifiIcon)`
  font-size: 1em;
`;
const ProfileFull2 = styled(BatteryFullIcon)`
  font-size: 1em;
`;
const ProfileLoginImg = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
  color: white;
`;
const ProfileImgIcon = styled.div`
  width: 100%;
  height: 30%;
`;

const ProfileLogin = styled.div`
  width: 100%;
  height: 70%;
  background-color: white;
  color: #000;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;
const Button = styled.button`
  outline: none;
  border: none;
  align-items: center;
  margin-left: 20px;
`;

export {
  Button,
  ProfileBox,
  ProfileClocks,
  ProfileIcon,
  ProfileParentTitle,
  ProfileTitle,
  ProfileArrow,
  ProfileH3,
  ProfileSignal2,
  ProfileFull2,
  ProfileWife2,
  ProfileLogin,
  ProfileLoginImg,
  ProfileImgIcon,
};
