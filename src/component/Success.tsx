import { useNavigate } from "react-router-dom";
import { ButtonWrapper, Icon, Text, Wrapper } from "../style/success";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import ButtonThird from "./ButtonThird";

interface SuccessProps {
  message: string;
  label?: string;
  isShowButton?: boolean;
  isShowSecondaryButton?: boolean;
  onClick?: () => void;
}

export default function Success({
  message,
  label,
  isShowButton,
  isShowSecondaryButton,
  onClick,
}: SuccessProps) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    window.location.href =
      "https://smoggy-cross-906.notion.site/ggugitt-b45750f76a824c4bb939cd57332356c2";
  };
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
      {isShowButton && (
        <>
          <ButtonWrapper>
            {isShowSecondaryButton && (
              <ButtonSecondary
                label="메인으로 가기"
                onClick={() => navigate("/")}
              />
            )}
            <ButtonPrimary label={label} onClick={onClick} />
          </ButtonWrapper>
          <ButtonThird label={"피드백 남겨주기"} onClick={handleButtonClick} />
        </>
      )}
    </Wrapper>
  );
}
