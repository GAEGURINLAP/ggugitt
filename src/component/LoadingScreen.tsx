import styled from "@emotion/styled";
import Lottie from "lottie-react";
import Loading from "../lottie/Loading-bullgaemi.json";

export default function LoadingScreen() {
  const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    max-width: 500px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  `;

  return (
    <Wrapper>
      <Lottie animationData={Loading} loop={true} />
    </Wrapper>
  );
}
