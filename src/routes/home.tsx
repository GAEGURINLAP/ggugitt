import styled from "@emotion/styled";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Alert from "../component/Alert";
import { useState } from "react";

import ButtonPrimary from "../component/ButtonPrimary";
import ButtonSecondary from "../component/ButtonSecondary";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
`;
const ButtonText = styled.button`
  color: #525252;
  &:hover {
    font-weight: 500;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 64px;
  text-align: center;
  font-weight: 300;
  line-height: 150%;
  b {
    font-weight: 700;
    color: red;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const [isShowAlert, setShowAlert] = useState(false);

  const clickLogOut = () => {
    setShowAlert(true);
  };

  const clickSurvey = () => {
    navigate("/survey");
  };

  const confirmLogOut = () => {
    auth.signOut();
    navigate(0);
  };

  return (
    <>
      <Wrapper>
        <ButtonWrapper>
          <ButtonText onClick={clickLogOut}>로그아웃</ButtonText>
        </ButtonWrapper>
        <Title>
          과연 오늘의 <b>불개미</b>는? 두구두구두구
        </Title>
        <ButtonPrimary
          onClick={clickSurvey}
          label={"투표하러 가기"}
          isWidthFull
          size={"Large"}
        />
        {isShowAlert && (
          <Alert
            message={"정말로 로그아웃 할건가요ㅠㅠ"}
            buttons={[
              <ButtonSecondary
                label={"아니오"}
                onClick={() => setShowAlert(false)}
                isWidthFull
              />,
              <ButtonPrimary
                label={"로그아웃"}
                onClick={confirmLogOut}
                isWidthFull
              />,
            ]}
          />
        )}
      </Wrapper>
    </>
  );
}
