import styled from "@emotion/styled";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IVote } from "./home";
// import { IVoteList } from "./vote-register/candidate";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100vh;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 120px;
`;
const WrapperMid = styled.div`
  padding: 0 24px;
  padding-top: 320px;
  height: 100vh;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
  text-align: center;
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

  const { id } = useParams();

  // const NewID = Number(id);

  const fetchVotes = async () => {
    const q = query(
      collection(db, "vote")
      // orderBy("create_at", "desc"),
      // limit(1)
    );
    console.log("q??", q);

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
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  console.log("vote에 뭐들음?", vote);
  return (
    <>
      {vote?.is_complete ? (
        <Wrapper>
          <Title>
            {vote?.vote_name} 투표의
            <br />
            우승자는...
          </Title>
          <Winner>
            <b>{vote?.vote_winner}</b>
            <br />
            축하드립니다!!!
          </Winner>
          <img src="/images/logo/404.png" alt="우승자" />
        </Wrapper>
      ) : (
        <WrapperMid>
          <Title>아직 종료되지 않은 투표입니다!</Title>
        </WrapperMid>
      )}
    </>
  );
}
