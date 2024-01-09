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
  border: 1px solid var(--main);
  transition: all 0.2s ease;
  &:hover {
    color: var(--white);
    background-color: var(--main);
    border: none;
  }
  cursor: pointer;
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
      {isLoading ? "Loading..." : label}
    </Wrapper>
  );
};

export default ButtonSecondary;
