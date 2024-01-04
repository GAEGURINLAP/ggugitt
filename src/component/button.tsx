import styled from "@emotion/styled";

const Wrapper = styled.button<ButtonProps>`
  height: 48px;
  padding: 24px;
  font-size: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(props) => {
    const isSecondary = props.isSecondary;
    const isWidthFull = props.isWidthFull;

    const mainColor = isSecondary ? "var(--main)" : "var(--white)";
    const bgColor = isSecondary ? "transparent" : "var(--main)";
    const borderColor = isSecondary ? "1px solid var(--main)" : "none";
    const hoverBgColor = isSecondary ? "var(--main)" : "var(--main-hover)";
    const textColor = isSecondary ? "var(--white)" : mainColor;

    return `
      color: ${textColor};
      background-color: ${bgColor};
      border: ${borderColor};
      width: ${isWidthFull && "100%"};

      &:hover {
        background-color: ${hoverBgColor};
        color: ${isSecondary && "var(--white)"};
      }
    `;
  }}
`;

interface ButtonProps {
  isLoading?: boolean;
  isWidthFull?: boolean;
  isSecondary?: boolean;
  label: string;
  onClick: () => void;
}

const Button = ({
  onClick,
  label,
  isLoading,
  isSecondary,
  isWidthFull,
}: ButtonProps) => {
  return (
    <Wrapper
      type="submit"
      onClick={onClick}
      isWidthFull={isWidthFull}
      isSecondary={isSecondary}
    >
      {isLoading ? "Loading..." : label}
    </Wrapper>
  );
};

export default Button;
