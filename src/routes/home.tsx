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

const Title = styled.h1`
  color: hotpink;
  font-size: 48px;
  margin-bottom: 80px;
  text-align: center;
`;

export default function Home() {
  const navigate = useNavigate();
  const [isShowAlert, setShowAlert] = useState(false);

  const clickLogOut = () => {
    setShowAlert(true);
  };

  const confirmLogOut = () => {
    auth.signOut();
    navigate(0);
  };

  return (
    <>
      <Wrapper>
        <Title>불개미 MVP 투표에 오신 것을 환영합니다!!</Title>
        <ButtonPrimary onClick={clickLogOut} label={"로그아웃"} isWidthFull />
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
