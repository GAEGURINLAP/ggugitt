import styled from "@emotion/styled";

import Header from "../component/Header";
import BottomButton01 from "../component/BottomButon01";

import { Label } from "./home";

const Wrapper = styled.div`
  /* padding: 0 24px; */
  padding-top: 120px;
  height: 100vh;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
  padding: 0 24px;
  b {
    color: var(--main);
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f2f2f2;
  transition: all 0.3s ease-out;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const WrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const WrapperRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;
export const Winner = styled.h4`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const WinnerLabel = styled.h4`
  color: #a2a2a2;
  font-size: 16px;
`;
export const WinnerName = styled.h4`
  /* color: #525252; */
`;

const array = ["0", "1", "2", "3"];

export default function VoteHistory() {
  return (
    <>
      <Header isNavigator />
      <Wrapper>
        <Title>
          역대 불개미 <br />
          히스토리 입니다.
        </Title>
        <List>
          {array.map((item) => (
            <Item>
              <WrapperLeft>
                <Name>2024년 1월 8일 불개미</Name>
                <Winner>
                  <WinnerLabel>우승자</WinnerLabel>
                  <WinnerName>박박지</WinnerName>
                </Winner>
              </WrapperLeft>
              <WrapperRight>
                <Label>투표 결과</Label>
                <img
                  src="/images/icon/common/icon-arrow-left.svg"
                  width={24}
                  height={24}
                  style={{ transform: "rotate(0.5turn)" }}
                />
              </WrapperRight>
            </Item>
          ))}
        </List>
      </Wrapper>
      <BottomButton01 label={"투표 새로 만들기"} />
    </>
  );
}
