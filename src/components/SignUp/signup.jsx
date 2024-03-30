import React from "react";

import {
  FormContainer,
  Input,
  Button,
  Form,
  SignUpParentTitle,
  SignUpClocks,
  SignUpIcon,
  SignUpSignal2,
  SignUpWife2,
  SignUpFull2,
  SignUpTitle,
  SignUpArrow,
  SignUpH3,
} from "./style";
import { StyledIcon } from "../Style/StyledBottomNavigationAction";

export const SignUp = () => {
  return (
    <FormContainer>
      <SignUpParentTitle>
        <SignUpIcon>
          <SignUpClocks>
            <StyledIcon>9:41</StyledIcon>
          </SignUpClocks>
          <StyledIcon>
            <SignUpSignal2 />

            <SignUpWife2 />

            <SignUpFull2 />
          </StyledIcon>
        </SignUpIcon>
        <SignUpTitle>
          <SignUpArrow />
          <SignUpH3>Create Account</SignUpH3>
        </SignUpTitle>
      </SignUpParentTitle>

      <Form>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Create Account</Button>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
