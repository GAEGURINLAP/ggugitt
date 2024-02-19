import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import Alert from "../component/Alert";
import BottomButton01 from "../component/BottomButon01";
import ButtonSecondary from "../component/ButtonSecondary";
import ButtonPrimary from "../component/ButtonPrimary";
import LoadingScreen from "../component/LoadingScreen";
import Success from "../component/Success";

import { IVoteList } from "./vote-register/candidate";

import {
  Wrapper,
  Error,
  Form,
  FormContainer,
  FormWrapper,
  GuideText,
  Input,
} from "../style/vote-register";
import { CurrentTitle, CurrentVote, VoteItem } from "./home";
import { VoteForm } from "../style/vote";

export interface VoteItemProps {
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
  const [vote, setVote] = useState<IVote>();
  const [alreadyVoter, setAlreadyVoter] = useState<String>();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAlertVote, setShowAlertVote] = useState(false);
  const [isShowAlertConfirm, setShowAlertConfirm] = useState(false);
  const [isShowAlertVoterFail, setIsShowAlertVoterFail] = useState(false);
  const [isShowAlertAlreadyVoter, setIsShowAlertAlreadyVoter] = useState(false);
  const [isVoter, setIsVoter] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const NewID = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

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
          description: "오늘의 투표 후보는 과연 누구일까요?! \n두구두구두구",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/bullgaemi-survey.appspot.com/o/il-vote-progress-squre.png?alt=media&token=c6985243-d021-4cb3-a178-4b299a22fdc9",
          link: {
            mobileWebUrl: `${import.meta.env.VITE_APP_BASE_URL}`,
            webUrl: `${import.meta.env.VITE_APP_BASE_URL}`,
          },
        },
        buttons: [
          {
            title: "당장 투표하러 가기",
            link: {
              mobileWebUrl: `${
                import.meta.env.VITE_APP_BASE_URL
              }/vote/${NewID}}`,
              webUrl: `${import.meta.env.VITE_APP_BASE_URL}/vote/${NewID}`,
            },
          },
        ],
      });
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
        <title>꾸깃 - 투표하기</title>
        <meta name="description" content="투표하기" />
        <meta property="og:title" content="꾸깃" />
        <meta
          property="og:image"
          content="/images/illust/il-vote-progress-landscape.png"
        />
        <meta property="og:url" content="https://ggugitt.com/vote" />
      </Helmet>
      {isShowAlertConfirm ? (
        <Success
          message={"투표 완료 되었습니다!"}
          label="다른 팀원 투표 강요하기"
          isShowButton
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
