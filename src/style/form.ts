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
  font-size: 40px;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
  width: 100%;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
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
