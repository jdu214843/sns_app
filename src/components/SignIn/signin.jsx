import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormContainer,
  Input,
  SignInBox,
  Form,
  Title,
  SpanOr,
} from "./style";

export const SignIn = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <SignInBox>
      <FormContainer>
        <Title>Sign In</Title>
        <Form>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit">Sign In</Button>
          <SpanOr>or</SpanOr>
          <Button type="submit" onClick={handleCreateAccount}>
            Create account
          </Button>
        </Form>
      </FormContainer>
    </SignInBox>
  );
};

export default SignIn;
