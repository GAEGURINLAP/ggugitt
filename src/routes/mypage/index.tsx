import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../component/Header";
import Alert from "../../component/Alert";
import ButtonSecondary from "../../component/ButtonSecondary";
import ButtonPrimary from "../../component/ButtonPrimary";

import { auth } from "../../firebase";
import { Container, Content, Title, WithdrawButton } from "./style.ts";

export default function MyPage() {
  const [isShowAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleWithdraw = () => {
    setShowAlert(true);
  };

  const confirmWithdraw = async () => {
    try {
      if (auth.currentUser) {
        await auth.currentUser.delete();
        navigate("/");
      }
    } catch (error) {
      console.error("회원탈퇴 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <>
      <Header isNavigator path="" />
      <Container>
        <Content>
          <Title>마이페이지</Title>
          <WithdrawButton onClick={handleWithdraw}>회원탈퇴</WithdrawButton>
        </Content>
      </Container>
      {isShowAlert && (
        <Alert
          message={"정말로 회원탈퇴 하시나요? 이 작업은 되돌릴 수 없습니다."}
          buttons={[
            <ButtonSecondary
              label={"취소"}
              onClick={() => setShowAlert(false)}
              isWidthFull
            />,
            <ButtonPrimary
              label={"탈퇴"}
              onClick={confirmWithdraw}
              isWidthFull
            />,
          ]}
        />
      )}
    </>
  );
}
