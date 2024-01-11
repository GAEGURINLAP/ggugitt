import styled from "@emotion/styled";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  background-color: var(--white);
`;

const Wrapper = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px 24px;
  gap: 8px;
`;

interface BottomButtonProps {
  onClick01?: () => void;
  onClick02?: () => void;
  isDisabled?: boolean;
  label01: string;
  label02: string;
}

const BottomButton02 = ({
  onClick01,
  onClick02,
  isDisabled,
  label01,
  label02,
}: BottomButtonProps) => {
  return (
    <Container>
      <Wrapper>
        <ButtonSecondary label={label01} onClick={onClick01} isWidthFull />
        <ButtonPrimary
          label={label02}
          onClick={onClick02}
          isWidthFull
          isDisabled={isDisabled}
        />
      </Wrapper>
    </Container>
  );
};

export default BottomButton02;
