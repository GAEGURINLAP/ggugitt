import styled from "@emotion/styled";

const Wrapper = styled.button<ButtonProps>`
  width: ${(props) => props.isWidthFull && "100%"};
  min-width: 120px;
  height: ${(props) => (props.size === "Large" ? "64px" : "48px")};
  padding: 0 24px;
  border-radius: ${(props) => (props.isRadiusFull ? "1000px" : "8px")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isDisabled ? "#a2a2a2" : "var(--white);")};
  background-color: ${(props) =>
    props.isDisabled ? "#e6e6e6" : "var(--main);"};
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => !props.isDisabled && "var(--main-hover)"};
    cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
  }
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

interface ButtonProps {
  isWidthFull?: boolean;
  isRadiusFull?: boolean;
  isDisabled?: boolean;
  size?: string;
  label?: string;
  onClick?: () => void;
}

const ButtonPrimary = ({
  onClick,
  label,
  size,
  isWidthFull,
  isRadiusFull,
  isDisabled,
}: ButtonProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      // 엔터 키가 눌렸을 때 실행할 동작
      if (onClick && !isDisabled) {
        onClick();
      }
    }
  };
  return (
    <Wrapper
      type="submit"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      isWidthFull={isWidthFull}
      isRadiusFull={isRadiusFull}
      isDisabled={isDisabled}
      label={label}
      size={size}
    >
      {label}
    </Wrapper>
  );
};

export default ButtonPrimary;
