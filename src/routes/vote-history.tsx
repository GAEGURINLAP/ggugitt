import styled from "@emotion/styled";

import Header from "../component/Header";
import BottomButton01 from "../component/BottomButon01";

import { IVote, Label } from "./home";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import LoadingScreen from "../component/LoadingScreen";

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

export const NoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 48px;
  gap: 32px;
`;

export const NoItemLabel = styled.div`
  font-size: 20px;
  color: #a2a2a2;
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export const Name = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;
export const Winner = styled.div`
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

export default function VoteHistory() {
  const [votes, setVotes] = useState<IVote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const user = auth.currentUser;

  const fetchVotes = async () => {
    setIsLoading(true);
    try {
      const votesQuery = query(
        collection(db, "vote"),
        where("user_id", "==", user?.uid),
        where("is_complete", "==", true),
        orderBy("create_at", "desc")
      );
      const snapshot = await getDocs(votesQuery);

      const votes = snapshot.docs.map((doc) => {
        const {
          vote_id,
          vote_list,
          voter_list,
          vote_name,
          vote_winner,
          total_votes_cnt,
          available_votes_cnt,
          already_voters,
          is_complete,
          close_time,
          user_id,
          user_name,
          create_at,
        } = doc.data();
        return {
          vote_id,
          vote_list,
          voter_list,
          vote_name,
          vote_winner,
          total_votes_cnt,
          available_votes_cnt,
          already_voters,
          is_complete,
          close_time,
          user_id,
          user_name,
          create_at,
          id: doc.id,
        };
      });
      setVotes(votes);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  console.log("vote제대로?", votes);

  const clickSurvey = () => {
    navigate("/vote-register");
  };

  return (
    <>
      <Header isNavigator />
      <Wrapper>
        <Title>
          역대 불개미 <br />
          히스토리 입니다
        </Title>
        <List>
          {isLoading ? (
            <LoadingScreen />
          ) : votes.length > 0 ? (
            votes.map((item, index) => (
              <Item
                key={`item${index}`}
                onClick={() => navigate(`/vote-history-result/${item.vote_id}`)}
              >
                <WrapperLeft>
                  <Name>{item.vote_name}</Name>
                  <Winner>
                    <WinnerLabel>우승자</WinnerLabel>
                    <WinnerName>{item.vote_winner}</WinnerName>
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
            ))
          ) : (
            <NoItem>
              <img
                src="/images/illust/illust-noitem.svg"
                width={240}
                height={240}
              />
              <NoItemLabel>아직 종료된 투표가 없어요!</NoItemLabel>
            </NoItem>
          )}
        </List>
      </Wrapper>

      <BottomButton01 label={"투표 새로 만들기"} onClick={clickSurvey} />
    </>
  );
}
