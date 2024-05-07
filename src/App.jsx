import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";

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
import SignIn from "./components/SignIn/signin";
import SignUp from "./components/SignUp/signup";

const NavigationBar = () => {
  const location = useLocation();
  const [value, setValue] = useState("/home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    location.pathname !== "/" &&
    location.pathname !== "/signup" && (
      <BottomNavigationParent value={value} onChange={handleChange}>
        <StyledBottomNavigationAction
          icon={
            <StyledIcon>
              <HomeIcon />
            </StyledIcon>
          }
          component={Link}
          to="/home"
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
    )
  );
};

const App = () => {
  const [displayedText, setDisplayedText] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  return (
    <Router>
      <Container>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <Home
                displayedText={displayedText}
                setDisplayedText={setDisplayedText}
                bookmarkedPosts={bookmarkedPosts}
                setBookmarkedPosts={setBookmarkedPosts}
              />
            }
          />
          <Route path="/messages" element={<Massages />} />
          <Route
            path="/bookmark"
            element={
              <Bookmark
                bookmarkedPosts={bookmarkedPosts}
                setBookmarkedPosts={setBookmarkedPosts}
              />
            }
          />
          <Route path="/profile" element={<Profile />} 
          
          />
        </Routes>

        <NavigationBar />
      </Container>
    </Router>
  );
};

export default App;
