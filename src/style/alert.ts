import styled from "@emotion/styled";

export const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999999;
`;

export const Container = styled.div`
  color: var(--black);
  width: 100%;
  max-width: 327px;
  background-color: var(--white);
  z-index: 99999;
  overflow: hidden;
  border-radius: 8px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 24px;
  gap: 32px;
  line-height: 150%;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 24px;
`;
export const Message = styled.div`
  font-size: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
