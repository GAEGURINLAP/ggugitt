import styled from "@emotion/styled";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Alert from "../component/Alert";
import { useEffect, useState } from "react";

import ButtonPrimary from "../component/ButtonPrimary";
import ButtonSecondary from "../component/ButtonSecondary";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100%;
  padding-bottom: 80px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
`;
const ButtonText = styled.button`
  color: #525252;
  &:hover {
    font-weight: 500;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 64px;
  text-align: center;
  font-weight: 300;
  line-height: 150%;
  b {
    font-weight: 700;
    color: red;
  }
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
  flex-direction: column;
  background-color: #f7f7f7;
  /* padding: 24px; */
  border-radius: 8px;
  overflow: hidden;
  /* gap: 24px; */
`;
export const VoteItem = styled.div`
  display: flex;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    /* background-color: #eaeaea; */
    background-color: var(--main);
    color: var(--white);
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
      <Wrapper>
        <ButtonWrapper>
          <ButtonText onClick={clickLogOut}>로그아웃</ButtonText>
        </ButtonWrapper>
        {votes[0]?.vote_state === "In Progress" ? (
          <CurrentVote>
            <Title>{votes[0]?.vote_name}</Title>
            <Form>
              {votes[0]?.vote_item.map((item, index) => (
                <VoteItem key={`item${index}`}>{item}</VoteItem>
              ))}
            </Form>
          </CurrentVote>
        ) : (
          <>
            <Title>
              과연 오늘의 <b>불개미</b>는? 두구두구두구
            </Title>
            <ButtonPrimary
              onClick={clickSurvey}
              label={"투표 만들기"}
              isWidthFull
              size={"Large"}
            />
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
    </>
  );
}
