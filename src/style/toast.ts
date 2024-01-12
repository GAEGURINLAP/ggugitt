import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeInToast = keyframes`
  from {
  bottom: 100px;
    opacity: 0;
  }
  to {
    bottom: 120px;
    opacity: 1;
  }
`;

const fadeOutToast = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  position: relative;
  bottom: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  width: fit-content;
  background-color: var(--main);
  animation: ${fadeInToast} 0.4s ease forwards,
    ${fadeOutToast} 0.4s ease 0.8s forwards;
  z-index: 9999;
`;
export const Message = styled.div`
  color: var(--white);
`;
