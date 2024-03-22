import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import styled from "@emotion/styled";

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
} from "../home/style";

import { WrapperMid, Title } from "../../style/vote-result";
import { GuideText } from "../../style/vote-register";

import useFetchVotes from "../../hooks/useFetchVotes";
import useShareKaKao from "../../hooks/useShareKakao";

import Header from "../../component/Header";
import Alert from "../../component/Alert";
import ButtonPrimary from "../../component/ButtonPrimary";
import ButtonSecondary from "../../component/ButtonSecondary";
import ButtonError from "../../component/ButtonError";
import BottomButton01 from "../../component/BottomButon01";
import LoadingScreen from "../../component/LoadingScreen";

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
  const [isShowAlertComplete, setIsShowAlertComplete] = useState(false);
  const [isShowAlertDeleteConfirm, setIsShowAlertDeleteConfirm] =
    useState(false);
  const [isShowAlertDelete, setIsShowAlertDelete] = useState(false);
  const [isShowAlertFail, setIsShowAlertFail] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const newId = Number(id);

  const user = auth.currentUser;

  const { vote, notVoterList, isLoading, setIsLoading, voteQuery } =
    useFetchVotes({
      id: newId,
    });

  const { initKakao, kakaoShareVote } = useShareKaKao();

  const clickSharingKaKaoVote = () => {
    initKakao();
    kakaoShareVote({ vote, id: newId });
  };

  // 이벤트: 투표 삭제 여부
  const clickDelete = () => {
    setIsShowAlertDeleteConfirm(true);
  };

  // 이벤트: 투표 삭제 완료
  const clickDeleteComplete = () => {
    setIsShowAlertDelete(false);
    navigate(0);
  };

  // 기능: 투표 삭제
  const onDelete = async () => {
    setIsLoading(true);

    const querySnapshot = await voteQuery(user?.uid);

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
    } finally {
      setIsShowAlertDelete(true);
      navigate("/");
    }
  };

  // 이벤트: 투표 종료 여부
  const clickVoteComplete = () => {
    if (vote?.total_votes_cnt === 0) {
      setIsLoading(false);
      setIsShowAlertFail(true);
      return;
    }
    setIsShowAlertComplete(true);
  };

  // 기능: 투표 종료
  const onVoteComplete = async () => {
    setIsLoading(true);

    const querySnapshot = await voteQuery(user?.uid);

    if (!querySnapshot.empty) {
      const latestDoc = querySnapshot.docs[0];
      const voteDocRef = doc(db, "vote", latestDoc.id);

      const highestVote = vote?.vote_list.reduce(
        (prev, current) =>
          current.votes_cnt > prev.votes_cnt ? current : prev,
        { name: "", votes_cnt: -1 }
      );

      // 문서 업데이트
      await updateDoc(voteDocRef, {
        is_complete: true,
        vote_winner: highestVote?.name,
      });
      setIsLoading(false);
      navigate(`/vote-history-result/${newId}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>꾸깃 - 투표 현황</title>
        <meta name="description" content="투표 현황" />
        <meta property="og:title" content="꾸깃" />
        <meta
          property="og:image"
          content="/images/illust/il-vote-progress-landscape.png"
        />
        <meta property="og:url" content="https://ggugitt.com/vote-progress" />
      </Helmet>

      {isLoading ? (
        <LoadingScreen />
      ) : vote?.user_id === user?.uid ? (
        vote?.is_complete ? (
          <WrapperMid>
            <img
              src="/images/illust/illust-noitem.svg"
              width={320}
              height={320}
            />
            <Title>이미 종료한 투표입니다!</Title>
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
                    {vote?.voter_list.map((member, index) => (
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: "8px",
                    marginTop: "24px",
                  }}
                >
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
              onClick={clickSharingKaKaoVote}
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
          <Title>다른 유저의 투표에요!</Title>
          <ButtonPrimary
            label="메인으로 가기"
            isWidthFull
            onClick={() => navigate("/")}
          />
        </WrapperMid>
      )}

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
