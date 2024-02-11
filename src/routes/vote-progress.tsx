import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import styled from "@emotion/styled";

// const { Kakao } = window;

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
  Refresh,
  VoterContainer,
  Label,
  MemberList,
  Member,
} from "./home";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { WrapperMid, Title } from "./vote-result";
import Header from "../component/Header";
// import LoadingScreen from "../component/LoadingScreen";

import Alert from "../component/Alert";

import ButtonPrimary from "../component/ButtonPrimary";
import ButtonSecondary from "../component/ButtonSecondary";
import ButtonError from "../component/ButtonError";

import BottomButton01 from "../component/BottomButon01";

import { IVoteList } from "./vote-register/candidate";
// import Toast from "../component/Toast";
import { GuideText } from "../style/vote-register";

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

export const CurrentTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const RefreshWrapper = styled.div`
  display: flex;
  align-items: end;
`;

export default function VoteProgress() {
  const [vote, setVote] = useState<IVote>();
  const [voteName, setVoteName] = useState<String>();
  const [voteList, setVoteList] = useState<IVoteList[]>([]);
  const [voterList, setVoterList] = useState<string[]>([]);
  const [notVoterList, setNotVoterList] = useState<string[]>([]);

  const [isShowAlertComplete, setIsShowAlertComplete] = useState(false);
  const [isShowAlertDeleteConfirm, setIsShowAlertDeleteConfirm] =
    useState(false);
  const [isShowAlertDelete, setIsShowAlertDelete] = useState(false);
  const [isShowAlertFail, setIsShowAlertFail] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const NewID = Number(id);

  const user = auth.currentUser;

  // useEffect(() => {
  //   // init 해주기 전에 clean up 을 해준다.
  //   Kakao.cleanup();
  //   // 자신의 js 키를 넣어준다.
  //   Kakao.init("c0000000000");
  //   // 잘 적용되면 true 를 뱉는다.
  //   console.log(Kakao.isInitialized());
  // }, []);

  const shareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_KAKAO_KEY);
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${voteName} 꾸깃할 시간이에요!`,
          description: "오늘의 MOM은 과연 누굴까요? \n두구두구두구",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/bullgaemi-survey.appspot.com/o/illust-kakao-vote.png?alt=media&token=f27539f3-42ab-4aff-bb22-ea2fda1049b9",
          link: {
            mobileWebUrl: "https://ggugitt.com",
            webUrl: "https://ggugitt.com",
          },
        },
        buttons: [
          {
            title: "당장 투표하러 가기",
            link: {
              mobileWebUrl: `https://ggugitt.com/vote/${id}`,
              webUrl: `https://ggugitt.com/vote/${id}`,
            },
          },
        ],
      });
    }
  };

  const executeVoteQuery = async (userId: string | undefined) => {
    const q = query(
      collection(db, "vote"),
      where("user_id", "==", userId),
      where("vote_id", "==", NewID),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  };

  const fetchVotes = async () => {
    // setIsLoading(true);
    try {
      const querySnapshot = await executeVoteQuery(user?.uid);

      const voteDoc = querySnapshot.docs[0];

      if (voteDoc) {
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
        } = voteDoc.data();

        // 여기에서 필요한 데이터를 사용합니다.
        setVote({
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
          id: voteDoc.id,
        });
      }

      // const newVote = votes.find((vote) => vote.vote_id == id);
      // setVote(newVote);

      const voteName = querySnapshot.docs.pop()?.data().vote_name;
      setVoteName(voteName);
      const voteList = querySnapshot.docs.pop()?.data().vote_list;
      setVoteList(voteList);

      const voterList = querySnapshot.docs.pop()?.data().voter_list;
      setVoterList(voterList);

      const alreadyVoterList = querySnapshot.docs.pop()?.data().already_voters;
      // setAlreadyVoterList(alreadyVoterList);

      const notVoterList = voterList.filter(
        (voter: string) => !alreadyVoterList.includes(voter)
      );

      setNotVoterList(notVoterList);

      // const voteId = querySnapshot.docs.pop()?.data().vote_id;
      // setVoteId(voteId);
    } catch (err) {
      alert(err);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  const clickDelete = () => {
    setIsShowAlertDeleteConfirm(true);
  };

  const clickDeleteComplete = () => {
    setIsShowAlertDelete(false);
    navigate(0);
  };

  const onDelete = async () => {
    // setIsLoading(true);

    const querySnapshot = await executeVoteQuery(user?.uid);

    try {
      setIsShowAlertDeleteConfirm(false);
      if (!querySnapshot.empty) {
        const latestDoc = querySnapshot.docs[0];
        const voteDocRef = doc(db, "vote", latestDoc.id);

        // 문서 삭제
        await deleteDoc(voteDocRef);
        // setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      // setIsLoading(false);
    } finally {
      setIsShowAlertDelete(true);
      navigate("/");
    }
  };

  const clickVoteComplete = () => {
    // if (vote?.total_votes_cnt === 0) {
    //   setIsLoading(false);
    //   setIsShowAlertFail(true);
    //   return;
    // }
    setIsShowAlertComplete(true);
  };

  const onVoteComplete = async () => {
    // setIsLoading(true);

    const querySnapshot = await executeVoteQuery(user?.uid);

    if (!querySnapshot.empty) {
      const latestDoc = querySnapshot.docs[0];
      const voteDocRef = doc(db, "vote", latestDoc.id);

      // const highestVote = voteList.reduce(
      //   (prev, current) =>
      //     current.votes_cnt > prev.votes_cnt ? current : prev,
      //   { name: "", votes_cnt: -1 }
      // );

      let highestVote = { name: "", votes_cnt: -1 };

      voteList.forEach((current) => {
        if (current.votes_cnt > highestVote.votes_cnt) {
          highestVote = current;
        }
      });

      // 문서 업데이트
      await updateDoc(voteDocRef, {
        is_complete: true,
        vote_winner: highestVote.name,
      });
      // setIsLoading(false);
      navigate(`/vote-history-result/${id}`);
    }
  };

  // const handleCopyClipBoard = async (text: string) => {
  //   try {
  //     setIsToast(true);
  //     await navigator.clipboard.writeText(text);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //   }
  // };

  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //   if (isToast) {
  //     timeout = setTimeout(() => {
  //       setIsToast(false);
  //     }, 1200);
  //   }

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [isToast]);

  return (
    <>
      <Helmet>
        <title>꾸깃 - 투표 현황이요~</title>
        <meta name="description" content="꾸깃꾸우깃" />
        <meta property="og:title" content="아하하하하" />
        <meta
          property="og:image"
          content="/images/illust/illust-ggugitt-progress.png"
        />
        <meta property="og:url" content="https://ggugitt.com/vote-progress" />
      </Helmet>
      {vote?.user_id === user?.uid ? (
        vote?.is_complete ? (
          <WrapperMid>
            <img
              src="/images/illust/illust-noitem.svg"
              width={320}
              height={320}
            />
            <Title>
              아직 종료되지 않은 <br /> 투표입니다!
            </Title>
            <ButtonPrimary
              label="메인으로 가기"
              isWidthFull
              onClick={() => navigate("/")}
            />
          </WrapperMid>
        ) : (
          <>
            <Header isNavigator path="" />
            <Wrapper>
              <CurrentVote>
                <CurrentTitleWrapper>
                  <CurrentTitleContainer>
                    <CurrentTitle>
                      {vote?.vote_name} <br />
                      투표 현황입니다.
                    </CurrentTitle>
                    <RefreshWrapper>
                      <Refresh onClick={() => navigate(0)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.967 12.362C20.6535 12.3074 20.3312 12.3796 20.0709 12.5626C19.8106 12.7456 19.6337 13.0245 19.579 13.338C19.2677 15.1268 18.3341 16.7479 16.9432 17.915C15.5523 19.0821 13.7937 19.72 11.978 19.716C7.72401 19.716 4.26301 16.255 4.26301 12C4.26301 7.746 7.72401 4.285 11.978 4.285C13.912 4.285 15.731 4.999 17.153 6.289L16.161 7.281C16.0312 7.41028 15.9399 7.57304 15.8971 7.75116C15.8543 7.92928 15.8618 8.11577 15.9187 8.2899C15.9756 8.46402 16.0797 8.61895 16.2194 8.73743C16.3591 8.85591 16.5289 8.93331 16.71 8.961L20.922 9.611C21.0759 9.63472 21.2332 9.62182 21.3811 9.57333C21.5291 9.52485 21.6635 9.44216 21.7735 9.33197C21.8835 9.22179 21.9659 9.08722 22.0142 8.93918C22.0624 8.79115 22.075 8.63383 22.051 8.48L21.402 4.269C21.3741 4.08805 21.2966 3.91835 21.1782 3.77874C21.0597 3.63914 20.9049 3.53508 20.7309 3.47811C20.5569 3.42115 20.3705 3.4135 20.1924 3.45602C20.0143 3.49854 19.8515 3.58957 19.722 3.719L18.85 4.592C16.9863 2.84962 14.5293 1.88179 11.978 1.885C6.40101 1.885 1.86301 6.423 1.86301 12C1.86301 17.578 6.40101 22.115 11.978 22.115C16.906 22.115 21.096 18.597 21.943 13.75C21.9976 13.4365 21.9254 13.1142 21.7424 12.8539C21.5594 12.5936 21.2805 12.4167 20.967 12.362Z"
                            fill="#8B95A1"
                          />
                        </svg>
                      </Refresh>
                    </RefreshWrapper>
                  </CurrentTitleContainer>
                </CurrentTitleWrapper>
                <VoteResultList>
                  {vote?.vote_list.map((item, index) => (
                    <VoteResult key={`item${index}`}>
                      <Content>
                        <Name>{item.name}</Name>
                        <VotesCnt
                          isVoteWinner={item.name === vote?.vote_winner}
                        >
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
                <VoterContainer>
                  <Label>유권자</Label>
                  <MemberList>
                    {voterList.map((member, index) => (
                      <Member key={`member${index}`}>{member}</Member>
                    ))}
                  </MemberList>
                </VoterContainer>
                <VoterContainer>
                  <Label>투표하지 않은 사람들</Label>
                  <MemberList>
                    {notVoterList.length > 0 ? (
                      notVoterList.map((voter, index) => (
                        <Member key={`voter${index}`}>{voter}</Member>
                      ))
                    ) : (
                      <GuideText style={{ marginTop: "4px" }}>
                        모두 투표를 완료했습니다!
                      </GuideText>
                    )}
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
              // onClick={() => handleCopyClipBoard(`${baseURL}/vote/${id}`)}
              onClick={() => shareKakao()}
            />
          </>
        )
      ) : (
        <WrapperMid>
          <img
            src="/images/illust/illust-noitem.svg"
            width={240}
            height={240}
          />
          <Title>다른 유저의 투표입니다!</Title>
          <ButtonPrimary
            label="메인으로 가기"
            isWidthFull
            onClick={() => navigate("/")}
          />
        </WrapperMid>
      )}

      {/* {isToast && <Toast message={"클립보드에 복사되었습니다."} />} */}

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

      {isShowAlertFail && (
        <Alert
          message={"아직 투표한 사람이 없습니다!"}
          buttons={[
            <ButtonPrimary
              label={"확인"}
              onClick={() => setIsShowAlertFail(false)}
              isWidthFull
            />,
          ]}
        />
      )}
    </>
  );
}
