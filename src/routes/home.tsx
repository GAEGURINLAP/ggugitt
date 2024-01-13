import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import Header from "../component/Header";
import BottomButton01 from "../component/BottomButon01";

import { IVoteList } from "./vote-register/candidate";

import Toast from "../component/Toast";
import ButtonPrimary from "../component/ButtonPrimary";
import Alert from "../component/Alert";
import ButtonSecondary from "../component/ButtonSecondary";
import BottomButton02 from "../component/BottomButon02";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100vh;
  padding-bottom: 80px;
`;

const Title = styled.h1`
  font-size: 32px;
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
  b {
    color: var(--main);
  }
`;

export const CurrentVote = styled.div`
  /* margin-top: 48px; */
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
export const VoteItem = styled.div<VoteItemProps>`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 32px;
  color: ${({ isSelected }) => (isSelected ? "var(--white)" : "var(--black)")};
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--main)" : "#ededed"};
  border-radius: 100px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover,
  :active {
    color: var(--white);
    background-color: var(--main);
  }
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

const Name = styled.div<{ isVoteWinner: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.isVoteWinner && "var(--main)"};
`;
const VotesCnt = styled.div<{ isVoteWinner: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.isVoteWinner && "var(--main)"};
`;

const Bar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #edf0f3;
  border-radius: 100px;
  overflow: hidden;
`;

const Fill = styled.div<{
  votesCnt: number;
  totalVotesCnt: number;
  isVoteWinner: boolean;
}>`
  width: ${(props) => Math.ceil((props.votesCnt / props.totalVotesCnt) * 100)}%;
  height: 8px;
  background-color: ${(props) =>
    props.isVoteWinner ? "var(--main)" : "#b0b7be"};
`;

export const VoterContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* align-items: end; */
  gap: 8px;
`;

export const Label = styled.h3`
  font-size: 14px;
  color: #525252;
`;

export const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
`;

export const Member = styled.div`
  display: flex;
  padding: 2px 12px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 32px;
  background-color: #ededed;
  border-radius: 100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

interface VoteItemProps {
  isSelected: boolean;
}

export interface IVote {
  vote_id: number;
  vote_list: IVoteList[];
  voter_list: string[];
  vote_name: string;
  vote_winner: string;
  total_votes_cnt: number;
  available_votes_cnt: number;
  already_voters: string[];
  is_complete: boolean;
  close_time: number;
  user_id: string;
  user_name: string;
  create_at: Date;
  id: string;
}

export default function Home() {
  const [votes, setVotes] = useState<IVote[]>([]);
  const [voteID, setVoteID] = useState();
  const [voteList, setVoteList] = useState<IVoteList[]>([]);
  const [voterList, setVoterList] = useState<string[]>([]);
  // const [closeTime, setCloseTime] = useState<number>();
  const [voteName, setVoteName] = useState<string>("");
  const [voteWinner, setVoteWinner] = useState<string>("");

  const [isShowAlertComplete, setIsShowAlertComplete] = useState(false);

  // const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
  //   null
  // );

  const user = auth.currentUser;
  console.log("user(currentUser):", user);

  const navigate = useNavigate();

  const [isToast, setIsToast] = useState(false);
  const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const fetchVotes = async () => {
    try {
      const votesQuery = query(
        collection(db, "vote"),
        where("user_id", "==", user?.uid),
        orderBy("create_at", "desc"),
        limit(1)
      );
      // console.log("votesQuery Eh", votesQuery);
      console.log("votesQuery 똑바로 드감??", votesQuery);
      const snapshot = await getDocs(votesQuery);
      console.log("snapshot 똑바로 드감??", snapshot);
      const voteID = snapshot.docs.pop()?.data().vote_id;
      setVoteID(voteID);
      console.log("voteID에 뭐가 담긴겨?", voteID);

      const voterList = snapshot.docs.pop()?.data().voter_list;
      setVoterList(voterList);

      const voteName = snapshot.docs.pop()?.data().vote_name;
      setVoteName(voteName);

      const voteList = snapshot.docs.pop()?.data().vote_list;
      setVoteList(voteList);

      const voteWinner = snapshot.docs.pop()?.data().vote_winner;
      setVoteWinner(voteWinner);
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
      alert(err);
    } finally {
      console.log("votes에 뭐가 담긴겨?", votes);

      // const closeTime = snapshot.docs.pop()?.data().close_time;
      // setCloseTime(closeTime);

      console.log("votes??", votes);
    }
  };

  // const onRegister = async () => {
  //   if (selectedItemIndex !== null) {
  //     const selectedList = votes[0]?.vote_list[selectedItemIndex];
  //     let VotesCnt = selectedList.votes_cnt;
  //     let TotalVotesCnt = votes[0]?.total_votes_cnt;
  //     let AvailableVotesCnt = votes[0]?.available_votes_cnt;

  //     VotesCnt += 1;
  //     TotalVotesCnt += 1;
  //     AvailableVotesCnt -= 1;

  //     // 'vote' 컬렉션에서 create_at을 기준으로 내림차순으로 정렬하여 첫 번째 문서 가져오기
  //     const q = query(
  //       collection(db, "vote"),
  //       orderBy("create_at", "desc"),
  //       limit(1)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     // 가져온 문서의 ID 또는 경로를 사용하여 문서 참조
  //     if (!querySnapshot.empty) {
  //       const latestDoc = querySnapshot.docs[0];
  //       const voteDocRef = doc(db, "vote", latestDoc.id);

  //       // 문서 업데이트
  //       await updateDoc(voteDocRef, {
  //         vote_list: votes[0].vote_list.map((item, index) =>
  //           index === selectedItemIndex
  //             ? { ...item, votes_cnt: VotesCnt }
  //             : item
  //         ),
  //         total_votes_cnt: TotalVotesCnt,
  //         available_votes_cnt: AvailableVotesCnt,
  //         already_voters: user?.uid,
  //       });
  //       alert("투표 성공했어!");
  //       setSelectedItemIndex(null);
  //       navigate(0);

  //       return;
  //     }
  //   }
  //   alert("선택된 index가 없습니다!");
  // };

  useEffect(() => {
    fetchVotes();
  }, []);

  console.log("votes에 뭐가 담긴겨?", votes);

  const clickSurvey = () => {
    navigate("/vote-register");
  };

  const clickVoteComplete = () => {
    setIsShowAlertComplete(true);
  };

  const onVoteComplete = async () => {
    const q = query(
      collection(db, "vote"),
      where("user_id", "==", user?.uid),
      orderBy("create_at", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    // 가져온 문서의 ID 또는 경로를 사용하여 문서 참조
    if (!querySnapshot.empty) {
      const latestDoc = querySnapshot.docs[0];
      const voteDocRef = doc(db, "vote", latestDoc.id);

      const highestVote = voteList.reduce(
        (prev, current) =>
          current.votes_cnt > prev.votes_cnt ? current : prev,
        { name: "", votes_cnt: -1 }
      );

      // 문서 업데이트
      await updateDoc(voteDocRef, {
        is_complete: true,
        vote_winner: highestVote.name,
      });
      navigate(0);
    }
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      setIsToast(true);
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isToast) {
      timeout = setTimeout(() => {
        setIsToast(false);
      }, 1200);
    }

    return () => {
      clearTimeout(timeout); // 컴포넌트가 unmount되거나 상태가 업데이트되면 타이머를 클리어
    };
  }, [isToast]);

  return (
    <>
      <Header />
      {votes[0]?.user_id === user?.uid ? (
        <>
          {votes[0].is_complete === false ? (
            <>
              <Wrapper>
                <CurrentVote>
                  <CurrentTitle>
                    <b>{votes[0]?.vote_name}</b> <br />
                    투표 현황입니다.
                  </CurrentTitle>
                  <VoteResultList>
                    {votes[0]?.vote_list.map((item, index) => (
                      <VoteResult key={`item${index}`}>
                        <Content>
                          <Name
                            isVoteWinner={item.name === votes[0]?.vote_winner}
                          >
                            {item.name}
                          </Name>
                          <VotesCnt
                            isVoteWinner={item.name === votes[0]?.vote_winner}
                          >
                            {item.votes_cnt}명
                          </VotesCnt>
                        </Content>
                        <Bar>
                          <Fill
                            votesCnt={item.votes_cnt}
                            totalVotesCnt={votes[0].total_votes_cnt}
                            isVoteWinner={item.name === votes[0]?.vote_winner}
                          />
                        </Bar>
                      </VoteResult>
                    ))}
                  </VoteResultList>

                  <VoterContainer>
                    <Label>투표할 사람들</Label>
                    <MemberList>
                      {voterList.map((member, index) => (
                        <Member key={`member${index}`}>{member}</Member>
                      ))}
                    </MemberList>
                  </VoterContainer>
                  <ButtonPrimary
                    label={"투표 종료하기"}
                    onClick={clickVoteComplete}
                  />
                </CurrentVote>
              </Wrapper>
              <BottomButton01
                label={"투표 링크 공유하기"}
                onClick={() => handleCopyClipBoard(`${baseURL}/vote/${voteID}`)}
              />
            </>
          ) : (
            <>
              <Wrapper>
                <CurrentVote>
                  <CurrentTitle>
                    {voteName} <br />
                    투표 결과입니다.
                    <br />
                    우승자는 <b>{voteWinner}</b>입니다!!
                  </CurrentTitle>
                  <VoteResultList>
                    {votes[0]?.vote_list.map((item, index) => (
                      <VoteResult key={`item${index}`}>
                        <Content>
                          <Name
                            isVoteWinner={item.name === votes[0]?.vote_winner}
                          >
                            {item.name}
                          </Name>
                          <VotesCnt
                            isVoteWinner={item.name === votes[0]?.vote_winner}
                          >
                            {item.votes_cnt}명
                          </VotesCnt>
                        </Content>
                        <Bar>
                          <Fill
                            votesCnt={item.votes_cnt}
                            totalVotesCnt={votes[0].total_votes_cnt}
                            isVoteWinner={item.name === votes[0]?.vote_winner}
                          />
                        </Bar>
                      </VoteResult>
                    ))}
                  </VoteResultList>
                </CurrentVote>
              </Wrapper>
              <BottomButton02
                label01={"투표 결과 공유하기"}
                label02={"새로운 투표 만들기"}
                onClick01={() =>
                  handleCopyClipBoard(`${baseURL}/vote-result/${voteID}`)
                }
                onClick02={clickSurvey}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Wrapper>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Title>
                과연 오늘의 <b>불개미</b>는? <br />
                두구두구
              </Title>
              <img
                src="/images/logo/bullgaemi.png"
                alt="불개미"
                width={176}
                height={240}
              />
            </div>
          </Wrapper>
          <BottomButton01 label={"투표 만들기"} onClick={clickSurvey} />
        </>
      )}
      {isToast && <Toast message={"클립보드에 복사되었습니다."} />}
      {isShowAlertComplete && (
        <Alert
          message={"정말 투표를 종료하실건가요?"}
          buttons={[
            <ButtonSecondary
              label={"취소"}
              onClick={() => setIsShowAlertComplete(false)}
              isWidthFull
            />,
            <ButtonPrimary
              label={"종료하기"}
              onClick={onVoteComplete}
              isWidthFull
            />,
          ]}
        />
      )}
    </>
  );
}
