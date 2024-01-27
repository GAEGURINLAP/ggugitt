import { useNavigate } from "react-router-dom";
import { ButtonWrapper, Icon, Text, Wrapper } from "../style/success";
import ButtonPrimary from "./ButtonPrimary";

interface SuccessProps {
  message: string;
  label?: string;
  isShowButton?: boolean;
  onClick?: () => void;
}

export default function Success({
  message,
  label,
  isShowButton,
  onClick,
}: SuccessProps) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Icon>
        <img
          src="/images/icon/common/icon-check-circle-64.svg"
          alt="체크 아이콘"
          width={64}
          height={64}
        />
      </Icon>
      <Text>{message}</Text>
      <ButtonWrapper>
        {isShowButton && <ButtonPrimary label={label} onClick={onClick} />}
      </ButtonWrapper>
      <ButtonPrimary label="메인으로 가기" onClick={() => navigate("/")} />
    </Wrapper>
  );
}
