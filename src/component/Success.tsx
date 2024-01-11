import { ButtonWrapper, Icon, Text, Wrapper } from "../style/success";
import ButtonPrimary from "./ButtonPrimary";

interface SuccessProps {
  message: string;
  label?: string;
  isShowButton?: boolean;
  onClick: () => void;
}

export default function Success({
  message,
  label,
  isShowButton,
  onClick,
}: SuccessProps) {
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
    </Wrapper>
  );
}
