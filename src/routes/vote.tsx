import styled from "@emotion/styled";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import BottomButton01 from "../component/BottomButon01";
import { IVoteList } from "./vote-register/candidate";
import Alert from "../component/Alert";
import ButtonSecondary from "../component/ButtonSecondary";
import ButtonPrimary from "../component/ButtonPrimary";
import Success from "../component/Success";

import {
  Error,
  Form,
  FormContainer,
  FormWrapper,
  GuideText,
  Input,
} from "./vote-register/voter";

import { useForm } from "react-hook-form";
// import Toast from "../component/Toast";
import LoadingScreen from "../component/LoadingScreen";
import { Helmet } from "react-helmet-async";
// import { registerServiceWorker } from "../utils/common/notification";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100vh;
  /* padding-bottom: 80px; */
`;

export const CurrentTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
  b {
    color: red;
  }
`;

export const CurrentVote = styled.div`
  /* margin-top: 48px; */
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const VoteTitle = styled.h2`
  text-align: center;
  font-size: 24px;
`;

export const VoteForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
`;

export const VoteItem = styled.div<VoteItemProps>`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
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

interface VoteItemProps {
  isSelected: boolean;
}

export interface IVote {
  user_id: string;
  user_name: string;
  vote_id: number;
  vote_list: IVoteList[];
  voter_list: string[];
  vote_name: string;
  total_votes_cnt: number;
  available_votes_cnt: number;
  already_voters: string[];
  is_complete: boolean;
  create_at: Date;
  id: string;
}

export interface IFormInput {
  name: string;
}

export default function Vote() {
  const navigate = useNavigate();

  const [vote, setVote] = useState<IVote>();
  const [alreadyVoter, setAlreadyVoter] = useState<String>();

  const [isLoading, setIsLoading] = useState(false);

  const [isShowAlertVote, setShowAlertVote] = useState(false);
  const [isShowAlertConfirm, setShowAlertConfirm] = useState(false);
  const [isShowAlertVoterFail, setIsShowAlertVoterFail] = useState(false);
  const [isShowAlertAlreadyVoter, setIsShowAlertAlreadyVoter] = useState(false);

  // const [isToast, setIsToast] = useState(false);

  // const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [isVoter, setIsVoter] = useState(false);

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { id } = useParams();

  const NewID = Number(id);

  const fetchVotes = async () => {
    const q = query(collection(db, "vote"));

    const snapshot = await getDocs(q);

    const votes = snapshot.docs.map((doc) => {
      const {
        user_id,
        user_name,
        vote_id,
        vote_list,
        voter_list,
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
        vote_id,
        vote_list,
        voter_list,
        vote_name,
        total_votes_cnt,
        available_votes_cnt,
        already_voters,
        is_complete,
        create_at,
        id: doc.id,
      };
    });

    const newVote = votes.find((vote) => vote.vote_id == id);

    // const voteID = snapshot.docs.pop()?.data().vote_id;
    // setVoteID(voteID);

    // if (!newVote) {
    //   navigate("/not-found");
    // }

    setVote(newVote);

    // const voterList = snapshot.docs.pop()?.data().voter_list;
    // setVoterList(voterList);
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

  // const handleCopyClipBoard = async (text: string) => {
  //   try {
  //     setIsToast(true);
  //     await navigator.clipboard.writeText(text);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //   }
  // };

  const shareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_KAKAO_KEY);
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${vote?.vote_name} 꾸깃할 시간이에요!`,
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
              mobileWebUrl: `https://ggugitt.com/vote/${NewID}`,
              webUrl: `https://ggugitt.com/vote/${NewID}`,
            },
          },
        ],
      });
    }
  };

  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //   if (isToast) {
  //     timeout = setTimeout(() => {
  //       setIsToast(false);
  //     }, 1200);
  //   }

  //   return () => {
  //     clearTimeout(timeout); // 컴포넌트가 unmount되거나 상태가 업데이트되면 타이머를 클리어
  //   };
  // }, [isToast]);

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

      const q = query(collection(db, "vote"), where("vote_id", "==", NewID));

      const querySnapshot = await getDocs(q);

      setShowAlertVote(false);
      setIsLoading(true);

      if (!querySnapshot.empty) {
        try {
          const voteDocRef = querySnapshot.docs[0].ref;
          await updateDoc(voteDocRef, {
            vote_list: vote?.vote_list.map((item, index) =>
              index === selectedItemIndex
                ? { ...item, votes_cnt: VotesCnt }
                : item
            ),
            total_votes_cnt: TotalVotesCnt,
            available_votes_cnt: AvailableVotesCnt,
            already_voters: AlreadyVoters,
          });
        } catch (err) {
          setIsLoading(false);
          alert(err);
        } finally {
          setIsLoading(false);
          setSelectedItemIndex(null);
          setShowAlertConfirm(true);
          return;
          // async function handleAllowNotification() {
          //   const permission = await Notification.requestPermission();

          //   registerServiceWorker();
          // }
        }
      }
    }
    setIsLoading(false);
    alert("선택된 index가 없습니다!");
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  return (
    <>
      {/* <LoadingScreen /> */}
      <Helmet>
        <title>꾸깃 - 투표하라고</title>
        <meta name="description" content="투표투표제발" />
        <meta property="og:title" content="우헤헿" />
        <meta
          property="og:image"
          content="/images/illust/illust-ggugitt-vote.png"
        />
        <meta property="og:url" content="https://ggugit.com/vote" />
      </Helmet>
      {isShowAlertConfirm ? (
        <Success
          message={"투표 완료 되었습니다!"}
          label="다른 팀원 투표 강요하기"
          isShowButton
          // onClick={() => handleCopyClipBoard(`${baseURL}/vote/${NewID}`)}
          onClick={() => shareKakao()}
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
                            message:
                              "특수문자,공백,숫자,영문은 입력이 불가능합니다.",
                          },
                          minLength: {
                            value: 2,
                            message: "이름은 2자 이상이어야 합니다.",
                          },
                          maxLength: {
                            value: 10,
                            message: "이름은 10자를 초과할 수 없습니다.",
                          },
                        })}
                        placeholder="이름을 입력해주세요"
                      />
                    </FormWrapper>
                  </Form>
                  {errors.name ? (
                    <Error>{errors.name.message}</Error>
                  ) : (
                    <GuideText>ex) 김꾸깃</GuideText>
                  )}
                </div>
              </FormContainer>
            </CurrentVote>
          </Wrapper>
          <BottomButton01 onClick={handleSubmit(clickConfim)} label={"확인"} />
          <BottomButton01 onClick={handleSubmit(clickConfim)} label={"확인"} />
        </>
      )}

      {isShowAlertVoterFail && (
        <Alert
          message={"투표권이 없는 이름입니다! ㅠㅠ"}
          subMessage={"이름을 정확히 입력해주셔야 합니다."}
          isShowSubMessege
          buttons={[
            <ButtonPrimary
              label={"다시 입력"}
              onClick={() => setIsShowAlertVoterFail(false)}
              isWidthFull
            />,
          ]}
        />
      )}
      {isShowAlertAlreadyVoter && (
        <Alert
          message={"이미 투표한 팀원입니다!"}
          buttons={[
            <ButtonPrimary
              label={"확인"}
              onClick={() => setIsShowAlertAlreadyVoter(false)}
              isWidthFull
            />,
          ]}
        />
      )}
      {/* {isToast && <Toast message={"클립보드에 복사되었습니다."} />} */}
      {isShowAlertVote && (
        <Alert
          message={"선택한 팀원으로 투표 하시겠습니까?"}
          buttons={[
            <ButtonSecondary
              label={"취소"}
              onClick={() => setShowAlertVote(false)}
              isWidthFull
            />,
            <ButtonPrimary
              label={"투표하기"}
              onClick={onRegister}
              isWidthFull
            />,
          ]}
        />
      )}
      {vote?.is_complete && (
        <Alert
          message={"이미 종료된 투표입니다!"}
          buttons={[
            <ButtonPrimary
              label={"확인"}
              onClick={() => navigate("/")}
              isWidthFull
            />,
          ]}
        />
      )}
    </>
  );
}
