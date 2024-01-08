import styled from "@emotion/styled";
import { useState } from "react";
import Alert from "../component/Alert";
import ButtonSecondary from "../component/ButtonSecondary";
import ButtonPrimary from "../component/ButtonPrimary";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100%;
  padding-bottom: 80px;
`;

export const CurrentTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
`;

export const CurrentVote = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const GNB = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  height: 80px;
  width: 100%;
  max-width: 500px;
  padding: 0 24px;
  background-color: var(--white);
`;

const GNBWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const VoteResultList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;
const VoteResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 24px;
  align-self: stretch;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const VotesCnt = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Bar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #edf0f3;
  border-radius: 100px;
  overflow: hidden;
`;

const Fill = styled.div`
  width: 20%;
  height: 8px;
  background-color: #b0b7be;
`;

export default function VoteCurrent() {
  const [isShowAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const clickLogOut = () => {
    setShowAlert(true);
  };

  const confirmLogOut = () => {
    auth.signOut();
    navigate(0);
  };

  const array = ["0", "1", "2", "3", "4"];

  return (
    <>
      <GNB>
        <GNBWrapper>
          <img
            src="/images/icon/common/icon-logout.svg"
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={clickLogOut}
          />
        </GNBWrapper>
      </GNB>
      <Wrapper>
        <CurrentVote>
          <CurrentTitle>
            오늘의 불개미 <br />
            투표 현황입니다.
          </CurrentTitle>
          <VoteResultList>
            {array.map((item, index) => (
              <VoteResult key={item[index]}>
                <Content>
                  <Name>박박탱</Name>
                  <VotesCnt>7명</VotesCnt>
                </Content>
                <Bar>
                  <Fill />
                </Bar>
              </VoteResult>
            ))}
          </VoteResultList>
        </CurrentVote>
      </Wrapper>

      {isShowAlert && (
        <Alert
          message={"정말로 로그아웃 할건가요ㅠㅠ"}
          buttons={[
            <ButtonSecondary
              label={"아니오"}
              onClick={() => setShowAlert(false)}
              isWidthFull
            />,
            <ButtonPrimary
              label={"로그아웃"}
              onClick={confirmLogOut}
              isWidthFull
            />,
          ]}
        />
      )}
    </>
  );
}
