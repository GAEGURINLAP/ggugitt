import styled from "@emotion/styled";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
`;

const Wrapper = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px 24px;
  gap: 8px;
`;

const BottomButton = () => {
  return (
    <Container>
      <Wrapper>
        <ButtonSecondary label={"추가하기"} isWidthFull />
        <ButtonPrimary label={"등록하기"} isWidthFull />
      </Wrapper>
    </Container>
  );
};

export default BottomButton;
