import styled from "@emotion/styled";

const Wrapper = styled.button<IButtonProps>`
  width: ${(props) => (props.isWidthFull ? "100%" : "fit-content")};
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
  /* &:hover {
    background-color: ${(props) => !props.isDisabled && "var(--main-hover)"};
    cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
  } */
  &:active {
    background-color: ${(props) => !props.isDisabled && "var(--main-hover)"};
  }
  box-shadow: ${(props) => props.isFloating && "0 4px 24px rgba(0,0,0,0.25)"};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

interface IButtonProps {
  isWidthFull?: boolean;
  isRadiusFull?: boolean;
  isDisabled?: boolean;
  isFloating?: boolean;
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
  isFloating,
}: IButtonProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
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
      isFloating={isFloating}
    >
      {label}
    </Wrapper>
  );
};

export default ButtonPrimary;
