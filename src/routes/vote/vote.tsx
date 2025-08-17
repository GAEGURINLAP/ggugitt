import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { db } from "../../firebase";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";

import useFetchVotes from "../../hooks/useFetchVotes";
import useShareKaKao from "../../hooks/useShareKakao";

import Alert from "../../component/Alert";
import BottomButton01 from "../../component/BottomButon01";
import ButtonSecondary from "../../component/ButtonSecondary";
import ButtonPrimary from "../../component/ButtonPrimary";
import LoadingScreen from "../../component/LoadingScreen";
import Success from "../../component/Success";
import Toast from "../../component/Toast";

import { Wrapper, Error, Form, FormContainer, FormWrapper, GuideText, Input } from "../../style/vote-register";

import { CurrentTitle, CurrentVote, VoteItem } from "../home/style";
import { VoteForm } from "../../style/vote";

export interface IFormInput {
  name: string;
}

export default function Vote() {
  const [alreadyVoter, setAlreadyVoter] = useState<String>();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [isShowAlertVote, setShowAlertVote] = useState(false);
  const [isShowAlertConfirm, setShowAlertConfirm] = useState(false);
  const [isShowAlertVoterFail, setIsShowAlertVoterFail] = useState(false);
  const [isShowAlertAlreadyVoter, setIsShowAlertAlreadyVoter] = useState(false);
  const [isVoter, setIsVoter] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const newId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { vote, isLoading, setIsLoading } = useFetchVotes({
    id: newId,
    isJustVote: true,
  });
  const { initKakao, kakaoShareVote } = useShareKaKao();

  const [isShowAlertShare, setIsShowAlertShare] = useState(false);
  const [isToast, setIsToast] = useState(false);

  const clickSharingKaKaoVote = () => {
    setIsShowAlertShare(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_APP_BASE_URL}/vote/${newId}`);
      setIsToast(true);
      setTimeout(() => setIsToast(false), 1200);
    } catch (error) {
      console.log(error);
    } finally {
      setIsShowAlertShare(false);
    }
  };

  const handleShareKakao = () => {
    initKakao();
    kakaoShareVote({ vote, id: newId });
    setIsShowAlertShare(false);
  };

  const clickVote = () => {
    setShowAlertVote(true);
  };

  const clickConfim = async (data: IFormInput) => {
    const { name } = data;
    setAlreadyVoter(name);

    if (vote?.already_voters.some((item) => item === name)) {
      setIsShowAlertAlreadyVoter(true);
      return;
    }

    if (vote?.voter_list.some((item) => item === name)) {
      setIsVoter(true);
      setAlreadyVoter(name);
    } else {
      setIsShowAlertVoterFail(true);
    }
  };

  const onRegister = async () => {
    if (selectedItemIndex !== null) {
      const selectedList = vote?.vote_list[selectedItemIndex];

      let VotesCnt = selectedList?.votes_cnt || 0;
      let TotalVotesCnt = vote?.total_votes_cnt || 0;
      let AvailableVotesCnt = vote?.available_votes_cnt || 0;

      VotesCnt += 1;
      TotalVotesCnt += 1;
      AvailableVotesCnt -= 1;

      const AlreadyVoters = [...(vote?.already_voters || []), alreadyVoter];

      const q = query(collection(db, "vote"), where("vote_id", "==", newId));

      const querySnapshot = await getDocs(q);

      setShowAlertVote(false);
      setIsLoading(true);

      if (!querySnapshot.empty) {
        try {
          const voteDocRef = querySnapshot.docs[0].ref;
          await updateDoc(voteDocRef, {
            vote_list: vote?.vote_list.map((item, index) =>
              index === selectedItemIndex ? { ...item, votes_cnt: VotesCnt } : item
            ),
            total_votes_cnt: TotalVotesCnt,
            available_votes_cnt: AvailableVotesCnt,
            already_voters: AlreadyVoters,
          });
        } catch (err) {
          setIsLoading(false);
          console.log("Firebase Error Message", err);
        } finally {
          setIsLoading(false);
          setSelectedItemIndex(null);
          setShowAlertConfirm(true);
          return;
        }
      }
    }
    setIsLoading(false);
    alert("선택된 index가 없습니다!");
  };

  return (
    <>
      {isShowAlertConfirm ? (
        <Success
          message={"투표가 완료 되었어요!"}
          label="투표 링크 공유하기"
          isShowButton
          onClick={clickSharingKaKaoVote}
        />
      ) : isVoter ? (
        <>
          <Wrapper>
            <CurrentVote>
              <CurrentTitle>
                {vote?.vote_name} <br />
                투표해주세요.
              </CurrentTitle>
              <VoteForm>
                {vote?.vote_list.map((item, index) => (
                  <VoteItem
                    key={`item${index}`}
                    onClick={() => setSelectedItemIndex(index)}
                    isSelected={selectedItemIndex === index}
                  >
                    {item.name}
                  </VoteItem>
                ))}
              </VoteForm>
            </CurrentVote>
          </Wrapper>
          {selectedItemIndex === null ? (
            <BottomButton01 label={"투표하기"} isDisabled />
          ) : (
            <BottomButton01 label={"투표하기"} onClick={clickVote} />
          )}

          {isLoading && <LoadingScreen />}
        </>
      ) : (
        <>
          <Wrapper>
            <CurrentVote>
              <CurrentTitle>
                투표자 이름을 <br />
                입력해주세요.
              </CurrentTitle>
              <FormContainer>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Form onSubmit={handleSubmit(clickConfim)}>
                    <FormWrapper>
                      <Input
                        {...register("name", {
                          required: true,
                          pattern: {
                            value: /^[^a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/,
                            message: "특수문자,공백,숫자,영문은 입력이 불가능해요.",
                          },
                          minLength: {
                            value: 2,
                            message: "이름은 2자 이상이어야 해요.",
                          },
                          maxLength: {
                            value: 10,
                            message: "이름은 10자를 초과할 수 없어요.",
                          },
                        })}
                        placeholder="이름을 입력해주세요"
                      />
                    </FormWrapper>
                  </Form>
                  {errors.name ? <Error>{errors.name.message}</Error> : <GuideText>ex) 김꾸깃</GuideText>}
                </div>
              </FormContainer>
            </CurrentVote>
          </Wrapper>
          <BottomButton01 onClick={handleSubmit(clickConfim)} label={"확인"} />
        </>
      )}

      {isShowAlertVoterFail && (
        <Alert
          message={"투표권이 없는 이름이군요..!"}
          subMessage={"이름을 정확히 입력해주셔야 해요!"}
          isShowSubMessege
          buttons={[<ButtonPrimary label={"다시 입력"} onClick={() => setIsShowAlertVoterFail(false)} isWidthFull />]}
        />
      )}
      {isShowAlertAlreadyVoter && (
        <Alert
          message={"이미 투표한 투표자에요!"}
          buttons={[<ButtonPrimary label={"확인"} onClick={() => setIsShowAlertAlreadyVoter(false)} isWidthFull />]}
        />
      )}

      {isShowAlertVote && (
        <Alert
          message={"선택한 투표 항목으로 투표 하시겠어요?"}
          buttons={[
            <ButtonSecondary label={"취소"} onClick={() => setShowAlertVote(false)} isWidthFull />,
            <ButtonPrimary label={"투표하기"} onClick={onRegister} isWidthFull />,
          ]}
        />
      )}
      {isShowAlertShare && (
        <Alert
          message={"공유 방법을 선택해 주세요."}
          isCloseOnDimClick
          onDimClick={() => setIsShowAlertShare(false)}
          buttons={[
            <ButtonSecondary label={"주소 복사"} onClick={handleCopyLink} isWidthFull />,
            <ButtonPrimary label={"카카오톡 공유"} onClick={handleShareKakao} isWidthFull />,
          ]}
        />
      )}
      {isToast && <Toast message={"주소가 복사되었습니다"} />}
      {vote?.is_complete && (
        <Alert
          message={"이미 종료된 투표에요!!"}
          buttons={[<ButtonPrimary label={"확인"} onClick={() => navigate("/")} isWidthFull />]}
        />
      )}
    </>
  );
}
