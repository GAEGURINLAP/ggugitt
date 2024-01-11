import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const fadeInText = keyframes`
  from {
    top: 15px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`;

const fadeInCheck = keyframes`
  from {
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`;

export const Icon = styled.div`
  animation: ${fadeInCheck} 0.6s ease;
`;

export const Text = styled.h2`
  font-size: 24px;
  font-weight: 500;
  position: relative;
  animation: ${fadeInText} 0.6s ease;
`;

export const ButtonWrapper = styled.div`
  animation: ${fadeInCheck} 0.6s ease;
  margin-top: 24px;
`;
