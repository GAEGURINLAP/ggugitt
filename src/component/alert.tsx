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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  width: fit-content;
  background-color: white;
  z-index: 99999;
  border-radius: 8px;
`;

const Title = styled.div`
  font-size: 24px;
`;
const Message = styled.div`
  font-size: 16px;
`;
const Button = styled.button`
  background-color: #528ff9;
  color: white;
  height: 48px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #417bde;
  }
`;

interface AlertProps {
  showTitle: boolean;
  title: string;
  error: string;
  onClose: () => void;
}
const Alert = ({ showTitle, title, error, onClose }: AlertProps) => {
  return (
    <>
      <Dim>
        <Wrapper>
          {showTitle && <Title>{title}</Title>}
          <Message>{error}</Message>
          <Button onClick={onClose}>확인</Button>
        </Wrapper>
      </Dim>
    </>
  );
};

export default Alert;
