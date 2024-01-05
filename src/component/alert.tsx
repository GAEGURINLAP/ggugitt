import {
  ButtonContainer,
  ButtonWrapper,
  Container,
  Dim,
  Message,
  Title,
  Wrapper,
} from "../style/alert";

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
        <Container>
          <Wrapper>
            {isShowTitle && <Title>{title}</Title>}
            <Message>{message}</Message>
            <ButtonContainer>
              {buttons.map((button, index) => (
                <ButtonWrapper key={index}>{button}</ButtonWrapper>
              ))}
            </ButtonContainer>
          </Wrapper>
        </Container>
      </Dim>
    </>
  );
};

export default Alert;
