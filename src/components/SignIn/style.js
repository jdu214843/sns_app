import react from "react";
import styled from "styled-components";

const SignInBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  /* background-color: #f0f0f0; */
  padding: 20px;
  border-radius: 10px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  width: 300px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #24786d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const SpanOr = styled.span`
  text-align: center;
  color: #797c7b;
`;

export { SignInBox, FormContainer, Button, Input, Form, Title, SpanOr };
