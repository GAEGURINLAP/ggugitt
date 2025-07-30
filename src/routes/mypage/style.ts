import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const Content = styled.div`
  max-width: 600px;
  height: 100vh;
  padding: 20px;
  margin-top: 96px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
`;

export const WithdrawButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff3742;
  }

  &:active {
    background-color: #ff2e3a;
  }
`;
