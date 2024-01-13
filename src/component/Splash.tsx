import styled from "@emotion/styled";
import { useEffect, useState } from "react";

// import SplashIcon from "../../public/images/logo/splash.svg";

export const SPLASH_TIME = 500; // ms

export const Container = styled.div<{ show: boolean }>`
  position: absolute;
  /* top: 0;
  left: 0; */
  width: 100vw;
  height: 100vh;
  background: var(
    --Gradation,
    linear-gradient(180deg, #d1fce1 0%, #1d5832 100%)
  );
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 160px;
  z-index: 99999999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

export const Logo = styled.div`
  width: 320px;
  height: 320px;
  border-radius: 1000px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: end;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
export const WordMark = styled.div`
  font-size: 24px;
  color: var(--white);
`;

export const Bar = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 4px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-radius: 100px;
  overflow: hidden;
`;

export const Track = styled.div`
  width: inherit;
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #b5e2c6;
`;

export const Thumb = styled.div<{
  progress: number;
}>`
  width: ${(props) => `${props.progress}%` || "0%"};
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #245f39;
  transition: width ${() => `${SPLASH_TIME}ms`} ease-in-out;
`;

type Props = {
  progress: number;
};

export default function Splash({ progress }: Props) {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, SPLASH_TIME + 200);
  }, []);
  return (
    <Container show={show}>
      <Wrapper>
        <Logo>
          {/* <SplashIcon /> */}
          <img
            src="/images/logo/splash.png"
            alt="Splash"
            width={264}
            height={264}
          />
        </Logo>
        <WordMark>&copy; GagurinLab</WordMark>
        <Bar>
          <Track />
          <Thumb progress={progress} />
        </Bar>
      </Wrapper>
    </Container>
  );
}
