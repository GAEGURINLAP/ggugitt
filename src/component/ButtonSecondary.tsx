import styled from "@emotion/styled";

const Wrapper = styled.button<ButtonProps>`
  width: ${(props) => props.isWidthFull && "100%"};
  min-width: 120px;
  height: 48px;
  padding: 0 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main);
  box-shadow: 0 0 0 1px var(--main) inset;
  transition: all 0.2s ease;
  /* &:hover {
    color: var(--white);
    background-color: var(--main);
    border: none;
  } */
  &:active {
    color: var(--white);
    background-color: var(--main);
    border: none;
  }
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

interface ButtonProps {
  isLoading?: boolean;
  isWidthFull?: boolean;
  label: string;
  onClick?: () => void;
}

const ButtonSecondary = ({
  onClick,
  label,
  isLoading,
  isWidthFull,
}: ButtonProps) => {
  return (
    <Wrapper
      type="submit"
      onClick={onClick}
      isWidthFull={isWidthFull}
      label={label}
    >
      {isLoading ? "로딩중입니다..." : label}
    </Wrapper>
  );
};

export default ButtonSecondary;
