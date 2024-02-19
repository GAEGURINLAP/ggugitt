import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VoteRegisterContext } from "../../store/vote-register-context";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

import {
  Error,
  Form,
  FormContainer,
  FormWrapper,
  Input,
  Label,
  Member,
  MemberList,
  Title,
  VoteContent,
  VoteItem,
  VoteWrapper,
  VoterContainer,
  Wrapper,
} from "../../style/vote-register";

import LoadingScreen from "../../component/LoadingScreen";
import BottomButton02 from "../../component/BottomButon02";
import Success from "../../component/Success";
import Alert from "../../component/Alert";
import ButtonSecondary from "../../component/ButtonSecondary";
import ButtonPrimary from "../../component/ButtonPrimary";
import Header from "../../component/Header";

export interface IVoteList {
  name: string;
  votes_cnt: number;
}

export default function CandidateRegister() {
  const [voteId, setVoteId] = useState();
  const [voteList, setVoteList] = useState<IVoteList[]>([]);
  const [voteName, setVoteName] = useState<String>();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isShowAlreadyAlert, setIsShowAlreadyAlert] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isToast, setIsToast] = useState(false);

  const { voterList } = useContext(VoteRegisterContext);

  const navigate = useNavigate();

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
              }/vote${voteId}}`,
              webUrl: `${import.meta.env.VITE_APP_BASE_URL}/vote${voteId}}`,
            },
          },
        ],
      });
    }
  };

  const onRegister = async () => {
    const user = auth.currentUser;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}년 ${
      currentDate.getMonth() + 1
    }월 ${currentDate.getDate()}일`;
    const currentTime = Date.now();
    const closeTime = currentTime + 2 * 60 * 1000; // 2분을 밀리초로 변환
    setVoteName(formattedDate);

    const votesQuery = query(
      collection(db, "vote"),
      orderBy("create_at", "desc"),
      limit(1)
    );
    const snapshot = await getDocs(votesQuery);

    const voteID = (snapshot.docs.pop()?.data().vote_id || 0) + 1;

    try {
      setIsLoading(true);
      setIsShowAlert(false);

      const highestVote = voteList.reduce(
        (prev, current) =>
          current.votes_cnt > prev.votes_cnt ? current : prev,
        { name: "", votes_cnt: 0 }
      );

      await addDoc(collection(db, "vote"), {
        vote_id: voteID,
        vote_list: voteList,
        voter_list: voterList,
        vote_name: `${formattedDate}`,
        vote_winner: highestVote.name,
        already_voters: [],
        total_votes_cnt: 0,
        available_votes_cnt: 11,
        is_complete: false,
        close_time: closeTime,
        user_id: user?.uid,
        user_name: user?.displayName || "Anonymous",
        create_at: currentTime,
      });

      setVoteId(voteID);

      const timeUntilClose = closeTime - currentTime;

      const voteDocRef = doc(collection(db, "vote"), voteID);

      setTimeout(() => {
        updateDoc(voteDocRef, { is_complete: true });
      }, timeUntilClose);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    } finally {
      setIsComplete(true);
      setIsLoading(false);
    }
  };

  const addItem = async (data: IVoteList) => {
    const { name } = data;
    const newVoteItem = { name, votes_cnt: 0 };

    if (voteList.some(({ name }) => name === newVoteItem.name)) {
      setIsShowAlreadyAlert(true);
      return;
    } else {
      const newVoteItems = [...voteList, newVoteItem];
      setVoteList(newVoteItems);
    }
  };

  const deleteItem = (itemToDelete: IVoteList) => {
    const updatedVoteItems = voteList.filter((item) => item !== itemToDelete);
    setVoteList(updatedVoteItems);
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

  const clickRegister = () => {
    setIsShowAlert(true);
  };

  const clickDeleteItem = (item: IVoteList) => {
    deleteItem(item);
  };

  const clickNavigateVoter = () => {
    navigate("/vote-register");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IVoteList>({});

  return (
    <>
      {isLoading && <LoadingScreen isDim />}

      {isComplete ? (
        <Success
          message={"투표 등록이 완료 되었습니다!"}
          label="투표 링크 공유하기"
          isShowButton
          isShowSecondaryButton
          onClick={() => shareKakao()}
        />
      ) : (
        <>
          <Header isNavigator path="vote-register" />
          <Wrapper>
            <Title>
              투표를 진행할 <br /> 후보를 등록해주세요
            </Title>
            <FormContainer>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Form
                  onSubmit={handleSubmit((data) => {
                    addItem(data);
                    reset();
                  })}
                >
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
                      placeholder="후보 이름을 입력해주세요"
                    />
                  </FormWrapper>
                </Form>
                {errors.name && <Error>{errors.name.message}</Error>}
              </div>
              <VoteWrapper>
                {voteList?.map((item, index) => (
                  <VoteItem key={`item${index}`}>
                    <VoteContent>
                      {item.name}
                      <img
                        src="/images/icon/common/icon-x-circle.svg"
                        width={20}
                        style={{ cursor: "pointer" }}
                        onClick={() => clickDeleteItem(item)}
                      />
                    </VoteContent>
                  </VoteItem>
                ))}
              </VoteWrapper>
            </FormContainer>
            <VoterContainer>
              <Label>등록한 팀원</Label>
              <MemberList>
                {voterList?.map((member: String, index: number) => (
                  <Member key={`member${index}`}>{member}</Member>
                ))}
              </MemberList>
            </VoterContainer>
          </Wrapper>
          {voteList.length === 0 ? (
            <BottomButton02
              label01={"추가하기"}
              label02={"등록하기"}
              onClick01={handleSubmit((data) => {
                addItem(data);
                reset();
              })}
              isDisabled
            />
          ) : (
            <BottomButton02
              label01={"추가하기"}
              label02={"등록하기"}
              onClick01={handleSubmit((data) => {
                addItem(data);
                reset();
              })}
              onClick02={clickRegister}
            />
          )}
          {!voterList && (
            <Alert
              message={"팀원을 먼저 등록해주세요!"}
              buttons={[
                <ButtonPrimary
                  label={"등록하러 가기"}
                  onClick={clickNavigateVoter}
                  isWidthFull
                />,
              ]}
            />
          )}
        </>
      )}
      {isShowAlert && (
        <Alert
          message={"입력한 후보가 맞습니까?"}
          buttons={[
            <ButtonSecondary
              label={"취소"}
              onClick={() => setIsShowAlert(false)}
              isWidthFull
            />,
            <ButtonPrimary
              label={"등록하기"}
              onClick={onRegister}
              isWidthFull
            />,
          ]}
        />
      )}
      {isShowAlreadyAlert && (
        <Alert
          message={"이미 추가한 후보입니다!"}
          buttons={[
            <ButtonPrimary
              label={"확인"}
              onClick={() => setIsShowAlreadyAlert(false)}
              isWidthFull
            />,
          ]}
        />
      )}
    </>
  );
}
