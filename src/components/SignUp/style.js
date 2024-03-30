import styled from "styled-components";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import BookmarkSignal from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";

const FormContainer = styled.div`
  align-items: center;
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 250px;
`;

const Input = styled.input`
  margin: 10px 40px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 200px;
  align-self: center;
  padding: 10px;
  background-color: #24786d;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignUpIcon = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  font-weight: 600;
`;
const SignUpParentTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  padding-top: 10px;
`;
const SignUpClocks = styled.div``;
const SignUpTitle = styled.div`
  display: flex;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const SignUpH3 = styled.div`
  font-weight: 600;
  align-self: center;
  font-size: 28px;
  flex: 4;
  margin-left: 30px;
`;
const SignUpArrow = styled(ArrowLeftIcon)`
  color: black;
  align-self: center;
  flex: 1;
  font-size: 1em;
  margin-right: 10px;
`;
const SignUpSignal2 = styled(BookmarkSignal)`
  font-size: 1em;
`;
const SignUpWife2 = styled(WifiIcon)`
  font-size: 1em;
`;
const SignUpFull2 = styled(BatteryFullIcon)`
  font-size: 1em;
`;

export {
  FormContainer,
  Form,
  Input,
  Button,
  SignUpClocks,
  SignUpIcon,
  SignUpParentTitle,
  SignUpTitle,
  SignUpArrow,
  SignUpH3,
  SignUpSignal2,
  SignUpFull2,
  SignUpWife2,
};
