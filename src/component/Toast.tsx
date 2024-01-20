import { Container, Message, Wrapper } from "../style/toast";

export interface IToastProps {
  isComplete?: boolean;
  message: string;
}

export default function Toast({ message, isComplete }: IToastProps) {
  return (
    <Container message={message} isComplete={isComplete}>
      <Wrapper>
        <Message>{message}</Message>
      </Wrapper>
    </Container>
  );
}
