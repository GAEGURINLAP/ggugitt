import styled from "@emotion/styled";
import ButtonPrimary from "./ButtonPrimary";

const Container = styled.div<IBottomButtonProps>`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  background-color: ${(props) => (props.isFloating ? "none" : "var(--white)")};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px 24px;
  gap: 8px;
`;

interface IBottomButtonProps {
  label: string;
  isFixed?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  isFloating?: boolean;
}

const BottomButton01 = ({
  onClick,
  label,
  isDisabled,
  isFloating,
}: IBottomButtonProps) => {
  return (
    <Container isFloating={isFloating} label={label}>
      <Wrapper>
        <ButtonPrimary
          label={label}
          onClick={onClick}
          isWidthFull
          isDisabled={isDisabled}
          isFloating={isFloating}
        />
      </Wrapper>
    </Container>
  );
};

export default BottomButton01;
