import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
  color: white;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Button = styled.button`
  background-color: #528ff9;
  height: 48px;
  color: white;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #417bde;
  }
`;

export const Error = styled.span`
  margin-left: 20px;
  font-size: 14px;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 24px;
  color: white;
`;
