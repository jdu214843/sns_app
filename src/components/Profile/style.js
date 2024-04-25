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
  padding-top: 20px;
  background-color: gray;
  color: white !important;
`;
const ProfileH3 = styled.div`
  font-weight: 600;
  align-self: center;
  font-size: 28px;
  text-align: center;
`;
const ProfileArrow = styled(ArrowLeftIcon)`
  color: #fff;

  background-color: #24786d;
  border-radius: 50%;
  font-size: 1em;
  margin-left: 20px;
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

  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ProfileLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 70%;
  z-index: 1000;
  background-color: white;
  color: #000;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;
const LogDiv = styled.div`
  display: flex;
  flex-direction: column;
  outline: none;
  border: none;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const ProfileDescription = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`;

const LogOutDiv = styled.div`
  width: 70px;

  color: black;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    transition: all 0.3s ease;
    color: red;
  }
`;

const UpdateBtn = styled.div`
  width: 50%;
  align-self: center;
  border: none;
  outline: none;
  border-radius: 16px;
  background-color: #24786d;
  cursor: pointer;
  color: #fff;
  text-align: center;

  font-style: capitalize;
  padding: 10px;
`;
export {
  UpdateBtn,
  ProfileDescription,
  LogDiv,
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
  LogOutDiv,
};
