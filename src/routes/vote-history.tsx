import Header from "../component/Header";
import BottomButton01 from "../component/BottomButon01";

import { IVote, Label } from "./home";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  Wrapper,
  List,
  Item,
  WrapperLeft,
  WrapperRight,
  Name,
  Status,
  StatusProgress,
  WinnerLabel,
  WinnerName,
  SkeletonItem,
  SkeletonWrapperLeft,
  SkeletonName,
  SkeletonStatus,
  SkeletonStatusProgress,
  HistoryTitle,
} from "../style/vote-history";
import Landing from "./landing";

export default function VoteHistory() {
  const [votes, setVotes] = useState<IVote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const user = auth.currentUser;

  const fetchVotes = async () => {
    try {
      const votesQuery = query(
        collection(db, "vote"),
        where("user_id", "==", user?.uid),
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
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const clickSurvey = () => {
    navigate("/vote-register");
  };

  const skeleton = ["1", "2", "3", "4", "5"];

  return (
    <>
      <Header />
      {isLoading ? (
        <Wrapper>
          <HistoryTitle>
            진행하셨던?!!! 투표 <br />
            히스토리 입니다.
          </HistoryTitle>
          <List>
            {skeleton.map((item, index) => (
              <SkeletonItem key={`item${item}${index}`}>
                <SkeletonWrapperLeft>
                  <SkeletonName />
                  <SkeletonStatus>
                    <SkeletonStatusProgress />
                  </SkeletonStatus>
                </SkeletonWrapperLeft>
              </SkeletonItem>
            ))}
          </List>
        </Wrapper>
      ) : votes.length > 0 ? (
        <>
          <Wrapper>
            <HistoryTitle>
              진행하셨던!!? 투표 <br />
              히스토리 입니다.
            </HistoryTitle>
            <List>
              {votes.map((item, index) =>
                item.is_complete ? (
                  <Item
                    key={`item${index}`}
                    onClick={() =>
                      navigate(`/vote-history-result/${item.vote_id}`)
                    }
                  >
                    <WrapperLeft>
                      <Name>{item.vote_name}</Name>
                      <Status>
                        <WinnerLabel>우승자</WinnerLabel>
                        <WinnerName>{item.vote_winner}</WinnerName>
                      </Status>
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
                ) : (
                  <Item
                    key={`item${index}`}
                    onClick={() => navigate(`/vote-progress/${item.vote_id}`)}
                  >
                    <WrapperLeft>
                      <Name>{item.vote_name}</Name>
                      <Status>
                        <StatusProgress>투표 진행중</StatusProgress>
                      </Status>
                    </WrapperLeft>
                    <WrapperRight>
                      <Label>투표 현황</Label>
                      <img
                        src="/images/icon/common/icon-arrow-left.svg"
                        width={24}
                        height={24}
                        style={{ transform: "rotate(0.5turn)" }}
                      />
                    </WrapperRight>
                  </Item>
                )
              )}
            </List>
          </Wrapper>
          <BottomButton01 label={"투표 새로 만들기"} onClick={clickSurvey} />
        </>
      ) : (
        <Landing />
      )}
    </>
  );
}
