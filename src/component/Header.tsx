import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "./Alert";
import ButtonSecondary from "./ButtonSecondary";
import ButtonPrimary from "./ButtonPrimary";
import DevBadge from "./DevBadge";

import { auth } from "../firebase";
import {
  BackButton,
  ButtonWrap,
  Container,
  Name,
  Wrapper,
  WrapperRight,
} from "../style/header";

interface IHeaderProp {
  isNavigator?: boolean;
  path?: string;
}

export default function Header({ isNavigator, path }: IHeaderProp) {
  const [isShowAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const clickBackButton = () => {
    navigate(`/${path}`);
  };

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
          <ButtonWrap>
            {isNavigator && (
              <BackButton onClick={clickBackButton}>
                <img
                  src="/images/icon/common/icon-arrow-left.svg"
                  width={24}
                  height={24}
                />
              </BackButton>
            )}
          </ButtonWrap>

          <WrapperRight>
            <DevBadge />
            <Name
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/mypage")}
            >
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
          message={"정말로 로그아웃 하시나요?!"}
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
