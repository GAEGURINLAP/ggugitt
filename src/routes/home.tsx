import styled from "@emotion/styled";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Alert from "../component/alert";
import { useState } from "react";

import ButtonPrimary from "../component/button-primary";
import ButtonSecondary from "../component/button-secondary";

const Title = styled.h1`
  color: hotpink;
  font-size: 48px;
  margin-top: 80px;
  margin-bottom: 80px;
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
      <Title>불개미 MVP 투표에 오신 것을 환영합니다!!</Title>
      <ButtonPrimary onClick={clickLogOut} label={"로그아웃"} />
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
    </>
  );
}
