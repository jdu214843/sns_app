import React from "react";

import { StyledIcon } from "../Style/StyledBottomNavigationAction";
import SignIn from "../SignIn/signin";
import {
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
  ProfileBox,
  ProfileImgIcon,
} from "./style";

const Profile = () => {
  return (
    <ProfileBox>
      <ProfileParentTitle>
        <ProfileClocks>
          <StyledIcon>9:41</StyledIcon>
        </ProfileClocks>
        <ProfileIcon>
          <StyledIcon>
            <ProfileSignal2 />
          </StyledIcon>
          <StyledIcon>
            <ProfileWife2 />
          </StyledIcon>
          <StyledIcon>
            <ProfileFull2 />
          </StyledIcon>
        </ProfileIcon>
      </ProfileParentTitle>
      <ProfileTitle>
        <ProfileArrow />
        <ProfileH3>Profile</ProfileH3>
      </ProfileTitle>
      <ProfileLoginImg>
        <ProfileImgIcon>Img</ProfileImgIcon>
        <ProfileLogin>
          <SignIn>
            <h1>Sign In</h1>
          </SignIn>
        </ProfileLogin>
      </ProfileLoginImg>
    </ProfileBox>
  );
};

export default Profile;
