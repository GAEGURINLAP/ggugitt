import styled from "@emotion/styled";
import ButtonPrimary from "../component/ButtonPrimary";
import { useNavigate } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  justify-content: center;
  width: 100%;
  height: 100vh;
  align-items: center;
  padding: 24px;
`;

export const Title = styled.div`
  font-size: 28px;
  color: #363636;
  font-weight: 300;
  text-align: center;
`;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <img
        src="/images/logo/bullgaemi.png"
        alt="불개미"
        width={176}
        height={240}
      />
      <Title>요청하신 페이지를 찾지 못했습니다.</Title>
      <ButtonPrimary
        label="메인으로 가기"
        isWidthFull
        onClick={() => navigate("/")}
      />
    </Wrapper>
  );
}
