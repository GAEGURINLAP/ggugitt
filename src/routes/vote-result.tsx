import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IVote } from "./home";
import LoadingScreen from "../component/LoadingScreen";
import { Helmet } from "react-helmet-async";
import AniResult from "/images/animation/ani-vote-result.gif";

import {
  Wrapper,
  ResultTitle,
  WinnerWrapper,
  Winner,
  WrapperMid,
  Title,
  Ani,
  BG,
} from "../style/vote-result";

// import { IVoteList } from "./vote-register/candidate";

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

      <Wrapper>
        <ResultTitle>
          {vote?.vote_name}
          <br />
          투표 결과입니다!!
        </ResultTitle>
        <WinnerWrapper>
          <Winner>{vote?.vote_winner}</Winner>
        </WinnerWrapper>
      </Wrapper>
      <Ani>
        <img src={AniResult} width={375} alt="애니메이션" />
      </Ani>
      <BG />

      {/* {vote?.is_complete ? (
        <>
          <Wrapper>
            <ResultTitle>
              {vote?.vote_name}
              <br />
              투표 결과입니다!!
            </ResultTitle>
            <WinnerWrapper>
              <Winner>{vote?.vote_winner}</Winner>
            </WinnerWrapper>
          </Wrapper>
          <img src={AniResult} alt="애니메이션" />
        </>
      ) : (
        <WrapperMid>
          <img
            src="/images/illust/illust-noitem.svg"
            width={240}
            height={240}
          />
          <Title>아직 종료되지 않은 투표입니다!</Title>
        </WrapperMid>
      )} */}
    </>
  );
}
