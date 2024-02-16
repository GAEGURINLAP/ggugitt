import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeInBG = keyframes`
  from {
  background-color: #101012;
  }
  to {
    background-color: white;
  }
`;

export const BG = styled.div`
  position: absolute;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  z-index: 1;
  background-color: #101012;
  animation: ${fadeInBG} 0.2s ease forwards;
  animation-delay: 0.75s;
`;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  gap: 64px;
  z-index: 3;
  padding-top: 80px;
`;
export const WrapperMid = styled.div`
  padding: 0 24px;
  padding-top: 240px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

export const Ani = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const Title = styled.h1`
  /* font-weight: 600; */
  line-height: 140%;
  text-align: center;
  font-size: 20px;
  color: #a2a2a2;
`;

const fadeInTitle = keyframes`
  from {
    top: -24px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
`;

export const ResultTitle = styled.h1`
  position: relative;
  top: 0px;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  line-height: 140%;
  animation: ${fadeInTitle} 0.3s ease-in-out forwards;
  opacity: 0;
  animation-delay: 0.8s;
`;

export const WinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 88px;
`;

// const fadeInText = keyframes`
//   0% {
//     top: -16px;
//     opacity: 0;
//     transform: scale(2);

//   }

//   60% {
//     transform: scale(0.5);

//   }
//   80% {
//     transform: scale(1.2);
//   }
//   90% {
//     transform: scale(0.7);
//   }
//   100% {
//     top: 0px;
//     opacity: 1;
//     transform: scale(1);
//   }
// `;

const fadeInWinner = keyframes`
  from {
    top: -16px;
    opacity: 0;
    transform: scale(2);
  }
  to {
    top: 0px;
    opacity: 1;
    transform: scale(1);
  }
`;

export const Winner = styled.h1`
  position: relative;
  font-size: 48px;
  font-weight: 700;
  opacity: 0;
  top: 0px;
  text-align: center;
  color: #36353e;
  animation: ${fadeInWinner} 0.3s ease-in-out forwards;
  animation-delay: 0.8s;
`;
