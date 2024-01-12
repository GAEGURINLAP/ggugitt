import { Container, Message, Wrapper } from "../style/toast";

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <Container>
      <Wrapper>
        <Message>{message}</Message>
      </Wrapper>
    </Container>
  );
}
