import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
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
import ButtonError from "../component/ButtonError";
import LoadingScreen from "../component/LoadingScreen";

const History = styled.div`
  /* position: fixed; */
  display: flex;
  justify-content: end;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding-top: 12px;
  /* max-width: 500px; */
  /* top: 80px; */
  cursor: pointer;

  &:hover {
    svg {
      path {
        fill: var(--main);
      }
    }
    h4 {
      color: var(--main);
    }
  }
`;

const HistoryLabel = styled.h4`
  font-size: 16px;
`;

const HistroyArrow = styled.div`
  svg {
    width: 24px;
    height: 24px;
    transform: rotate(0.5turn);
    transition: fill 0.3s ease-out;
  }
`;

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  /* height: 100vh; */
  padding-bottom: 160px;
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

export const CurrentTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

  const [voteName, setVoteName] = useState<string>("");
  const [voteWinner, setVoteWinner] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [isShowAlertComplete, setIsShowAlertComplete] = useState(false);
  const [isShowAlertDeleteConfirm, setIsShowAlertDeleteConfirm] =
    useState(false);
  const [isShowAlertDelete, setIsShowAlertDelete] = useState(false);

  const user = auth.currentUser;

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
      const snapshot = await getDocs(votesQuery);
      const voteID = snapshot.docs.pop()?.data().vote_id;
      setVoteID(voteID);

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
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const clickSurvey = () => {
    navigate("/vote-register");
  };

  const clickDelete = () => {
    setIsShowAlertDeleteConfirm(true);
  };

  const clickHistory = () => {
    navigate("/vote-history");
  };

  const onDelete = async () => {
    setIsLoading(true);

    const q = query(
      collection(db, "vote"),
      where("user_id", "==", user?.uid),
      orderBy("create_at", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    try {
      setIsShowAlertDeleteConfirm(false);
      if (!querySnapshot.empty) {
        const latestDoc = querySnapshot.docs[0];
        const voteDocRef = doc(db, "vote", latestDoc.id);

        // 문서 삭제
        await deleteDoc(voteDocRef);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    } finally {
      setIsShowAlertDelete(true);
    }
  };

  const clickVoteComplete = () => {
    setIsShowAlertComplete(true);
  };

  const clickDeleteComplete = () => {
    setIsShowAlertDelete(false);
    navigate(0);
  };

  const onVoteComplete = async () => {
    setIsLoading(true);

    const q = query(
      collection(db, "vote"),
      where("user_id", "==", user?.uid),
      orderBy("create_at", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

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
      setIsLoading(false);
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
      clearTimeout(timeout);
    };
  }, [isToast]);

  return (
    <>
      <Header />

      {isLoading && <LoadingScreen />}
      {votes[0]?.user_id === user?.uid ? (
        <>
          {votes[0].is_complete === false ? (
            <>
              <Wrapper>
                <CurrentVote>
                  <CurrentTitleWrapper>
                    <CurrentTitle>
                      <b>{votes[0]?.vote_name}</b> <br />
                      투표 현황입니다.
                    </CurrentTitle>
                    <History onClick={clickHistory}>
                      <HistoryLabel>투표 히스토리</HistoryLabel>
                      <HistroyArrow>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="icon-arrow-left-small-mono">
                            <path
                              id="Vector"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M15.375 20.1C15.1977 20.1001 15.0222 20.0651 14.8584 19.9972C14.6947 19.9292 14.546 19.8296 14.421 19.704L7.67095 12.954C7.54555 12.8286 7.44607 12.6798 7.3782 12.516C7.31032 12.3521 7.27539 12.1765 7.27539 11.9992C7.27539 11.8219 7.31032 11.6463 7.3782 11.4825C7.44607 11.3187 7.54555 11.1698 7.67095 11.0445L14.421 4.29448C14.5453 4.16475 14.6944 4.06117 14.8593 3.9898C15.0242 3.91843 15.2018 3.88071 15.3815 3.87886C15.5612 3.877 15.7395 3.91105 15.9058 3.979C16.0722 4.04695 16.2233 4.14744 16.3504 4.27457C16.4774 4.4017 16.5778 4.55291 16.6456 4.71934C16.7134 4.88577 16.7473 5.06407 16.7453 5.24378C16.7433 5.42348 16.7055 5.60098 16.634 5.76587C16.5625 5.93075 16.4588 6.0797 16.329 6.20398L10.5345 12L16.329 17.7945C16.518 17.9832 16.6469 18.2238 16.6992 18.4857C16.7514 18.7477 16.7248 19.0193 16.6227 19.2662C16.5205 19.513 16.3475 19.724 16.1254 19.8724C15.9032 20.0208 15.6421 20.1 15.375 20.1Z"
                              fill="#8B95A1"
                            />
                          </g>
                        </svg>
                        {/* <img
                          src="/images/icon/common/icon-arrow-left.svg"
                          width={24}
                          height={24}
                          style={{ transform: "rotate(0.5turn)" }}
                          className="arrow-icon"
                        /> */}
                      </HistroyArrow>
                    </History>
                  </CurrentTitleWrapper>

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
                  <div style={{ display: "flex", width: "100%", gap: "8px" }}>
                    <ButtonError
                      label={"투표 삭제하기"}
                      onClick={clickDelete}
                      isWidthFull
                    />
                    <ButtonPrimary
                      label={"투표 종료하기"}
                      onClick={clickVoteComplete}
                      isWidthFull
                    />
                  </div>
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
      {isShowAlertDeleteConfirm && (
        <Alert
          message={"정말 투표를 삭제하시겠습니까?"}
          buttons={[
            <ButtonSecondary
              label={"취소"}
              onClick={() => setIsShowAlertDeleteConfirm(false)}
              isWidthFull
            />,
            <ButtonError label={"삭제하기"} onClick={onDelete} isWidthFull />,
          ]}
        />
      )}
      {isShowAlertDelete && (
        <Alert
          message={"투표를 삭제하였습니다."}
          buttons={[
            <ButtonPrimary
              label={"확인"}
              onClick={clickDeleteComplete}
              isWidthFull
            />,
          ]}
        />
      )}
      {/* <Toast message={"클립보드에 복사되었습니다."} /> */}
    </>
  );
}
