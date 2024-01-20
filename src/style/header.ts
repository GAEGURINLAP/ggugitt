import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  height: 80px;
  width: 100%;
  max-width: 500px;
  padding: 0 24px;
  background-color: var(--white);
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const BackButton = styled.div`
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

export const WrapperRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* width: 100%; */
  gap: 8px;
`;

export const Name = styled.div`
  color: #525252;
  font-weight: 400;
  b {
    font-weight: 600;
  }
`;
