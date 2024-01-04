import styled from "@emotion/styled";

const Wrapper = styled.button<ButtonProps>`
  width: ${(props) => props.isWidthFull && "100%"};
  height: 48px;
  padding: 24px;
  font-size: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  background-color: var(--main);
  &:hover {
    background-color: var(--main-hover);
  }
  cursor: pointer;
`;

interface ButtonProps {
  isLoading?: boolean;
  isWidthFull?: boolean;
  label: string;
  onClick: () => void;
}

const ButtonPrimary = ({
  onClick,
  label,
  isLoading,
  isWidthFull,
}: ButtonProps) => {
  return (
    <Wrapper type="submit" onClick={onClick} isWidthFull={isWidthFull}>
      {isLoading ? "Loading..." : label}
    </Wrapper>
  );
};

export default ButtonPrimary;
