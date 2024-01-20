import styled from "@emotion/styled";

import Header from "../component/Header";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100vh;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
  b {
    color: var(--main);
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 24px;
  border-bottom: 1px solid #d0d1d2;
`;

export const WrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Name = styled.h2`
  font-size: ;
`;
export const Winner = styled.h4`
  color: #525252;
`;

export default function VoteHistory() {
  return (
    <>
      <Header />
      <Wrapper>
        <Title>
          역대 불개미 <br />
          히스토리 입니다.
        </Title>
        <List>
          <Item>
            <WrapperLeft>
              <Name>2024년 1월 8일 불개미</Name>
              <Winner>박박지</Winner>
            </WrapperLeft>
          </Item>
        </List>
      </Wrapper>
    </>
  );
}
