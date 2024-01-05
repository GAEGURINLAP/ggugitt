import styled from "@emotion/styled";
import Lottie from "lottie-react";
import Loading from "../lottie/Loading-bullgaemi.json";

export default function LoadingScreen() {
  const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <Wrapper>
      <Lottie animationData={Loading} loop={true} />
    </Wrapper>
  );
}
