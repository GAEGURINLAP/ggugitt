import styled from "@emotion/styled";
// import Lottie from "lottie-react";
// import Loading from "../lottie/Loading-bullgaemi.json";
import GLoading from "/images/animation/loading.gif";

const Wrapper = styled.div<ILoadingProps>`
  position: absolute;
  left: 0;
  background-color: ${(props) => (props.isDim ? "rgba(0,0,0,0.2)" : "none")};
  width: 100%;
  /* max-width: 500px; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;

interface ILoadingProps {
  isDim?: boolean;
}

export default function LoadingScreen({ isDim }: ILoadingProps) {
  return (
    <Wrapper isDim={isDim}>
      <img src={GLoading} width={120} height={120} alt="ggugitt Loading" />
      {/* <Lottie animationData={Loading} loop={true} /> */}
    </Wrapper>
  );
}
