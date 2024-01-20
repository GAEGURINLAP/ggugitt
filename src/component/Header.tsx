import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "./Alert";
import ButtonSecondary from "./ButtonSecondary";
import ButtonPrimary from "./ButtonPrimary";

import { auth } from "../firebase";
import {
  BackButton,
  Container,
  Name,
  Wrapper,
  WrapperRight,
} from "../style/header";

export default function Header() {
  const [isShowAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const clickLogOut = () => {
    setShowAlert(true);
  };

  const confirmLogOut = () => {
    auth.signOut();
    navigate(0);
  };

  const userName = auth.currentUser?.displayName;

  return (
    <>
      <Container>
        <Wrapper>
          <BackButton>
            <img
              src="/images/icon/common/icon-arrow-left.svg"
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
              onClick={clickLogOut}
            />
          </BackButton>
          <WrapperRight>
            <Name>
              <b>{userName}</b>님
            </Name>
            <img
              src="/images/icon/common/icon-logout.svg"
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
              onClick={clickLogOut}
            />
          </WrapperRight>
        </Wrapper>
      </Container>
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
