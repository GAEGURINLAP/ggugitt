import { Link as RouterLink } from "react-router-dom";

import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  padding-top: 120px;
`;

export const Title = styled.h1`
  margin-top: 24px;
  font-size: 32px;
  font-weight: 300;
  b {
    color: var(--main);
    font-weight: 700;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  width: 100%;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #d0d1d2;
  background-color: var(--white);
`;

export const Error = styled.span`
  margin-left: 20px;
  font-size: 14px;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 32px;
`;

export const ForgotPassword = styled.div`
  display: flex;
  justify-content: end;
  font-size: 14px;
`;

export const StyledLink = styled(RouterLink)`
  color: var(--main);
  &:hover {
    color: var(--main-hover);
  }
`;
