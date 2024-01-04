import styled from "@emotion/styled";

const Wrapper = styled.button`
  height: 48px;
  padding: 24px;
  font-size: 16px;
  background-color: var(--main);
  color: var(--white);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: var(--main-hover);
  }
`;

interface ButtonProps {
  isLoading?: boolean;
  label: string;
  onClick: () => void;
}

const Button = ({ onClick, isLoading, label }: ButtonProps) => {
  return (
    <Wrapper type="submit" onClick={onClick}>
      {isLoading ? "Loading..." : label}
    </Wrapper>
  );
};

export default Button;
