import { useEffect, useState } from "react";
import {
  Wrapper,
  CurrentTitle,
  CurrentTitleWrapper,
  CurrentVote,
  VoteResultList,
  VoteResult,
  Content,
  Name,
  VotesCnt,
  Bar,
  Fill,
  IVote,
} from "./home";

import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useParams } from "react-router-dom";
import { WrapperMid, Title } from "./vote-result";
import Header from "../component/Header";

export default function VoteHistoryResult() {
  const [vote, setVote] = useState<IVote>();

  const { id } = useParams();

  console.log("id??", id);

  const user = auth.currentUser;

  const fetchVotes = async () => {
    try {
      const votesQuery = query(collection(db, "vote"));
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

      console.log("votes??", votes);

      const newVote = votes.find((vote) => vote.vote_id == id);
      setVote(newVote);
    } catch (err) {
      alert(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  console.log("vote??", vote);

  return (
    <>
      <Header isNavigator />
      {vote?.user_id === user?.uid ? (
        vote?.is_complete ? (
          <Wrapper>
            <CurrentVote>
              <CurrentTitleWrapper>
                <CurrentTitle>
                  {vote?.vote_name} <br />
                  투표 결과입니다.
                  <br />
                  우승자는 <b>{vote?.vote_winner}</b>입니다!!
                </CurrentTitle>
              </CurrentTitleWrapper>
              <VoteResultList>
                {vote?.vote_list.map((item, index) => (
                  <VoteResult key={`item${index}`}>
                    <Content>
                      <Name isVoteWinner={item.name === vote.vote_winner}>
                        {item.name}
                      </Name>
                      <VotesCnt isVoteWinner={item.name === vote?.vote_winner}>
                        {item.votes_cnt}명
                      </VotesCnt>
                    </Content>
                    <Bar>
                      <Fill
                        votesCnt={item.votes_cnt}
                        totalVotesCnt={vote?.total_votes_cnt}
                        isVoteWinner={item.name === vote?.vote_winner}
                      />
                    </Bar>
                  </VoteResult>
                ))}
              </VoteResultList>
            </CurrentVote>
          </Wrapper>
        ) : (
          <WrapperMid>
            <img
              src="/images/illust/illust-noitem.svg"
              width={240}
              height={240}
            />
            <Title>
              아직 종료되지 않은 <br /> 투표입니다!
            </Title>
          </WrapperMid>
        )
      ) : (
        <WrapperMid>
          <img
            src="/images/illust/illust-noitem.svg"
            width={240}
            height={240}
          />
          <Title>다른 유저의 투표입니다!</Title>
        </WrapperMid>
      )}
    </>
  );
}
