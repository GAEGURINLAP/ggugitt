import styled from "@emotion/styled";

import { auth, db } from "../firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Alert from "../component/Alert";
import { useEffect, useState } from "react";

import ButtonPrimary from "../component/ButtonPrimary";
import ButtonSecondary from "../component/ButtonSecondary";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import BottomButton01 from "../component/BottomButon01";
import { IVoteList } from "./vote-register";

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

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const VotesCnt = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Bar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #edf0f3;
  border-radius: 100px;
  overflow: hidden;
`;

const Fill = styled.div<{ votesCnt: number; totalVotesCnt: number }>`
  width: ${(props) => Math.ceil((props.votesCnt / props.totalVotesCnt) * 100)}%;
  height: 8px;
  background-color: #b0b7be;
`;

interface VoteItemProps {
  isSelected: boolean;
}

export interface IVote {
  user_id: string;
  user_name: string;
  vote_list: IVoteList[];
  vote_name: string;
  total_votes_cnt: number;
  available_votes_cnt: number;
  already_voters: string[];
  is_complete: boolean;
  create_at: Date;
  id: string;
}

export default function Vote() {
  const [votes, setVotes] = useState<IVote[]>([]);

  const [isShowAlert, setShowAlert] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const { id } = useParams();

  const user = auth.currentUser;

  const navigate = useNavigate();
  const location = useLocation();

  const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

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
        vote_list,
        vote_name,
        total_votes_cnt,
        available_votes_cnt,
        already_voters,
        is_complete,
        create_at,
      } = doc.data();
      return {
        user_id,
        user_name,
        vote_list,
        vote_name,
        total_votes_cnt,
        available_votes_cnt,
        already_voters,
        is_complete,
        create_at,
        id: doc.id,
      };
    });

    setVotes(votes);
  };

  const onRegister = async () => {
    if (selectedItemIndex !== null) {
      const selectedList = votes[0]?.vote_list[selectedItemIndex];
      let VotesCnt = selectedList.votes_cnt;
      let TotalVotesCnt = votes[0]?.total_votes_cnt;
      let AvailableVotesCnt = votes[0]?.available_votes_cnt;

      VotesCnt += 1;
      TotalVotesCnt += 1;
      AvailableVotesCnt -= 1;

      // 'vote' 컬렉션에서 create_at을 기준으로 내림차순으로 정렬하여 첫 번째 문서 가져오기
      const q = query(
        collection(db, "vote"),
        orderBy("create_at", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      // 가져온 문서의 ID 또는 경로를 사용하여 문서 참조
      if (!querySnapshot.empty) {
        const latestDoc = querySnapshot.docs[0];
        const voteDocRef = doc(db, "vote", latestDoc.id);

        // 문서 업데이트
        await updateDoc(voteDocRef, {
          vote_list: votes[0].vote_list.map((item, index) =>
            index === selectedItemIndex
              ? { ...item, votes_cnt: VotesCnt }
              : item
          ),
          total_votes_cnt: TotalVotesCnt,
          available_votes_cnt: AvailableVotesCnt,
          already_voters: user?.uid,
        });
        alert("투표 성공했어!");
        setSelectedItemIndex(null);
        navigate(0);

        return;
      }
    }
    alert("선택된 index가 없습니다!");
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const clickLogOut = () => {
    setShowAlert(true);
  };

  const clickSurvey = () => {
    navigate("/vote-register");
  };

  const confirmLogOut = () => {
    auth.signOut();
    navigate(0);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <GNB>
        <GNBWrapper>
          <img
            src="/images/icon/common/icon-logout.svg"
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={clickLogOut}
          />
        </GNBWrapper>
      </GNB>
      {votes[0]?.user_id === user?.uid ? (
        <>
          {votes[0].is_complete === false &&
          votes[0]?.already_voters?.includes(user?.uid) ? (
            <>
              <Wrapper>
                <CurrentVote>
                  <CurrentTitle>
                    오늘의 불개미 {id} <br />
                    투표 현황입니다.
                  </CurrentTitle>
                  <VoteResultList>
                    {votes[0]?.vote_list.map((item, index) => (
                      <VoteResult key={`item${index}`}>
                        <Content>
                          <Name>{item.name}</Name>
                          <VotesCnt>{item.votes_cnt}명</VotesCnt>
                        </Content>
                        <Bar>
                          <Fill
                            votesCnt={item.votes_cnt}
                            totalVotesCnt={votes[0].total_votes_cnt}
                          />
                        </Bar>
                      </VoteResult>
                    ))}
                  </VoteResultList>
                </CurrentVote>
              </Wrapper>
              <BottomButton01
                label={"링크 공유하기"}
                onClick={() =>
                  handleCopyClipBoard(`${baseURL}${location.pathname}`)
                }
              />
            </>
          ) : (
            <>
              <Wrapper>
                <CurrentVote>
                  <CurrentTitle>
                    오늘의 불개미를 {id} <br />
                    투표해주세요.
                  </CurrentTitle>
                  <Form>
                    {votes[0]?.vote_list.map((item, index) => (
                      <VoteItem
                        key={`item${index}`}
                        onClick={() => setSelectedItemIndex(index)}
                        isSelected={selectedItemIndex === index}
                      >
                        {item.name}
                      </VoteItem>
                    ))}
                  </Form>
                </CurrentVote>
              </Wrapper>
              <BottomButton01 label={"투표하기"} onClick={onRegister} />
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
                두구두구두구
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
    </>
  );
}
