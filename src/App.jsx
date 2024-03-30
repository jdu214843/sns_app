import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import {
  Home,
  Bookmark,
  Massages,
  Profile,
  Container,
} from "./components/index";

import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import {
  BottomNavigationParent,
  StyledBottomNavigationAction,
  StyledIcon,
} from "./components/Style/StyledBottomNavigationAction";
import SignUp from "./components/SignUp/signup";

const App = () => {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/messages" element={<Massages />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        <BottomNavigationParent value={value} onChange={handleChange}>
          <StyledBottomNavigationAction
            icon={
              <StyledIcon>
                <HomeIcon />
              </StyledIcon>
            }
            component={Link}
            to="/"
          />

          <StyledBottomNavigationAction
            icon={
              <StyledIcon>
                <MessageIcon />
              </StyledIcon>
            }
            component={Link}
            to="/messages"
          />
          <StyledBottomNavigationAction
            icon={
              <StyledIcon>
                <BookmarkIcon />
              </StyledIcon>
            }
            component={Link}
            to="/bookmark"
          />
          <StyledBottomNavigationAction
            icon={
              <StyledIcon>
                <PersonIcon />
              </StyledIcon>
            }
            component={Link}
            to="/profile"
          />
        </BottomNavigationParent>
      </Container>
    </Router>
  );
};

export default App;
