import styled from "@emotion/styled";

import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Alert from "../component/Alert";
import { useEffect, useState } from "react";

import ButtonPrimary from "../component/ButtonPrimary";
import ButtonSecondary from "../component/ButtonSecondary";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import BottomButton01 from "../component/BottomButon01";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100%;
  padding-bottom: 80px;
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

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 64px;
  text-align: center;
  font-weight: 300;
  line-height: 150%;
  b {
    font-weight: 700;
    color: red;
  }
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
  gap: 24px;
`;

export const VoteTitle = styled.h2`
  text-align: center;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
`;
export const VoteItem = styled.div`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 32px;
  background-color: #ededed;
  border-radius: 100px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover,
  :active {
    color: var(--white);
    background-color: var(--main);
  }
`;

export interface IVote {
  user_id: string;
  user_name: string;
  vote_item: string[];
  vote_name: string;
  vote_state: string;
  create_at: Date;
  id: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [isShowAlert, setShowAlert] = useState(false);

  const [votes, setVotes] = useState<IVote[]>([]);
  const fetchVotes = async () => {
    const votesQuery = query(
      collection(db, "vote"),
      orderBy("create_at", "desc")
    );
    const snapshot = await getDocs(votesQuery);
    const votes = snapshot.docs.map((doc) => {
      const {
        user_id,
        user_name,
        vote_item,
        vote_name,
        vote_state,
        create_at,
      } = doc.data();
      return {
        user_id,
        user_name,
        vote_item,
        vote_name,
        vote_state,
        create_at,
        id: doc.id,
      };
    });
    setVotes(votes);
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const clickLogOut = () => {
    setShowAlert(true);
  };

  const clickSurvey = () => {
    navigate("/vote");
  };

  const confirmLogOut = () => {
    auth.signOut();
    navigate(0);
  };

  return (
    <>
      <GNB>
        <GNBWrapper>
          {/* <ButtonText onClick={clickLogOut}>로그아웃</ButtonText> */}
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
        {votes[0]?.vote_state === "In Progress" ? (
          <>
            <CurrentVote>
              {/* <Title>{votes[0]?.vote_name}</Title> */}
              <CurrentTitle>
                오늘의 불개미를 <br />
                투표해주세요.
              </CurrentTitle>
              <Form>
                {votes[0]?.vote_item.map((item, index) => (
                  <VoteItem key={`item${index}`}>{item}</VoteItem>
                ))}
              </Form>
            </CurrentVote>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Title>
                과연 오늘의 <b>불개미</b>는? <br />
                두구두구두구
              </Title>
              <img
                src="/images/logo/bullgaemi.png"
                alt="불개미"
                width={176}
                height={240}
              />
            </div>
            {/* <ButtonPrimary
              onClick={clickSurvey}
              label={"투표 만들기"}
              isWidthFull
              size={"Large"}
            /> */}
          </>
        )}

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
      </Wrapper>
      {votes[0]?.vote_state === "In Progress" ? (
        <BottomButton01 label={"투표하기"} />
      ) : (
        <BottomButton01 label={"투표 만들기"} onClick={clickSurvey} />
      )}
    </>
  );
}
