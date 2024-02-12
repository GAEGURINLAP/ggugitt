import styled from "@emotion/styled";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IVote } from "./home";
import LoadingScreen from "../component/LoadingScreen";
import { Helmet } from "react-helmet-async";
// import { Helmet } from 'react-helmet-async';
// import { IVoteList } from "./vote-register/candidate";

export const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  /* height: 100vh; */
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;
export const WrapperMid = styled.div`
  padding: 0 24px;
  padding-top: 240px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

export const Title = styled.h1`
  /* font-weight: 600; */
  line-height: 140%;
  text-align: center;
  font-size: 20px;
  color: #a2a2a2;
`;

export const ResultTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  line-height: 140%;
`;

export const WinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Winner = styled.h1`
  font-size: 56px;
  font-weight: 600;
  line-height: 140%;
  text-align: center;
  b {
    color: var(--main);
  }
`;

export default function VoteResult() {
  const [vote, setVote] = useState<IVote>();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  // const NewID = Number(id);

  const fetchVotes = async () => {
    setIsLoading(true);

    try {
      const q = query(collection(db, "vote"));

      const snapshot = await getDocs(q);

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
      const newVote = votes.find((vote) => vote.vote_id == id);
      setVote(newVote);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>꾸깃 - 투표 결과를 확인하세요!</title>
        <meta name="description" content="투표 결과 확인" />
        <meta property="og:title" content="꾸깃" />
        <meta
          property="og:image"
          content="/images/illust/il-vote-progress-landscape.png"
        />
        <meta property="og:url" content="https://ggugitt.com/vote-progress" />
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) : vote?.is_complete ? (
        <Wrapper>
          <ResultTitle>
            {vote?.vote_name} 투표의
            <br />
            우승자는...
          </ResultTitle>
          <WinnerWrapper>
            <img
              src="/images/illust/illust-crown.png"
              alt="우승자"
              width={120}
            />
            <Winner>
              <b>{vote?.vote_winner}</b>
              <br />
              축하드립니다!
            </Winner>
          </WinnerWrapper>
        </Wrapper>
      ) : (
        <WrapperMid>
          <img
            src="/images/illust/illust-noitem.svg"
            width={240}
            height={240}
          />
          <Title>아직 종료되지 않은 투표입니다!</Title>
        </WrapperMid>
      )}
    </>
  );
}
