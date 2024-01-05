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
  color: var(--white);
  background-color: var(--main);
  &:hover,
  :active {
    background-color: var(--main-hover);
  }
  cursor: pointer;
`;

interface ButtonProps {
  isWidthFull?: boolean;
  isRadiusFull?: boolean;
  size?: string;
  label: string;
  onClick?: () => void;
}

const ButtonPrimary = ({
  onClick,
  label,
  size,
  isWidthFull,
  isRadiusFull,
}: ButtonProps) => {
  return (
    <Wrapper
      type="submit"
      onClick={onClick}
      isWidthFull={isWidthFull}
      isRadiusFull={isRadiusFull}
      label={label}
      size={size}
    >
      {label}
    </Wrapper>
  );
};

export default ButtonPrimary;
