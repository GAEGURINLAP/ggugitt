import styled from "@emotion/styled";

const Dim = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const Wrapper = styled.div`
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px 24px 24px;
  width: fit-content;
  min-width: 320px;
  background-color: var(--white);
  z-index: 99999;
  border-radius: 8px;
`;

const Title = styled.div`
  font-size: 24px;
`;
const Message = styled.div`
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

interface AlertProps {
  title?: string;
  message: string;
  isShowTitle?: boolean;
  buttons: React.ReactNode[];
}

const Alert = ({ title, message, isShowTitle, buttons }: AlertProps) => {
  return (
    <>
      <Dim>
        <Wrapper>
          {isShowTitle && <Title>{title}</Title>}
          <Message>{message}</Message>
          <ButtonContainer>
            {buttons.map((button, index) => (
              <ButtonWrapper key={index}>{button}</ButtonWrapper>
            ))}
          </ButtonContainer>
        </Wrapper>
      </Dim>
    </>
  );
};

export default Alert;
