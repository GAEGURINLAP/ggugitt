import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { IToastProps } from "../component/Toast";

const fadeInToast = keyframes`
  from {
  bottom: -24px;
    opacity: 0;
  }
  to {
    bottom: 0px;
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
export const Container = styled.div<IToastProps>`
  position: absolute;
  bottom: ${(props) => (props.isComplete ? "48px" : "96px")};
  display: flex;
  width: 100%;
  max-width: 500px;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  position: relative;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  width: fit-content;
  background-color: var(--main);
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  animation: ${fadeInToast} 0.4s ease forwards,
    ${fadeOutToast} 0.4s ease 0.8s forwards;
  z-index: 9999;
`;
export const Message = styled.div`
  color: var(--white);
`;
