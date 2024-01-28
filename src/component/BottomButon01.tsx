import styled from "@emotion/styled";
import ButtonPrimary from "./ButtonPrimary";

const Container = styled.div<BottomButtonProps>`
  position: ${(props) => (props.isNotFixed ? "fixed" : "flex")};
  bottom: ${(props) => props.isNotFixed && "0"};
  width: 100%;
  max-width: 500px;
  background-color: var(--white);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px 24px;
  gap: 8px;
`;

interface BottomButtonProps {
  label: string;
  isNotFixed?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
}

const BottomButton = ({
  onClick,
  label,
  isDisabled,
  isNotFixed,
}: BottomButtonProps) => {
  return (
    <Container label={label} isNotFixed={isNotFixed}>
      <Wrapper>
        <ButtonPrimary
          label={label}
          onClick={onClick}
          isWidthFull
          isDisabled={isDisabled}
        />
      </Wrapper>
    </Container>
  );
};

export default BottomButton;
