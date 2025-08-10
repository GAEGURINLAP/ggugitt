import {
  ButtonContainer,
  ButtonWrapper,
  Container,
  Dim,
  Message,
  MessageWrapper,
  SubMessage,
  Title,
  Wrapper,
} from "../style/alert";

interface AlertProps {
  title?: string;
  message: string;
  subMessage?: string;
  isShowTitle?: boolean;
  isShowSubMessege?: boolean;
  buttons: React.ReactNode[];
  isCloseOnDimClick?: boolean;
  onDimClick?: () => void;
}

const Alert = ({
  title,
  message,
  subMessage,
  buttons,
  isShowTitle,
  isShowSubMessege,
  isCloseOnDimClick = false,
  onDimClick,
}: AlertProps) => {
  return (
    <>
      <Dim
        onPointerDown={() => {
          if (!isCloseOnDimClick) return;
          if (onDimClick) onDimClick();
        }}
      >
        <Container
          onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
        >
          <Wrapper>
            {isShowTitle && <Title>{title}</Title>}
            <MessageWrapper>
              <Message>{message}</Message>
              {isShowSubMessege && <SubMessage>{subMessage}</SubMessage>}
            </MessageWrapper>
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
