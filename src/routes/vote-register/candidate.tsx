import styled from "@emotion/styled";

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

import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";

import LoadingScreen from "../../component/LoadingScreen";
import BottomButton02 from "../../component/BottomButon02";
import Success from "../../component/Success";
import Alert from "../../component/Alert";
import ButtonSecondary from "../../component/ButtonSecondary";
import ButtonPrimary from "../../component/ButtonPrimary";
// import Toast from "../../component/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Label, Member, MemberList, VoterContainer } from "../home";
import Header from "../../component/Header";
import { VoteRegisterContext } from "../../store/vote-register-context";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 96px 24px 0;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
  border: none;
  height: fit-content;
  border-bottom: 1px solid #d0d1d2;
  transition: border-bottom-color 0.3s ease;

  & :active,
  :focus-within {
    border-bottom-color: var(--main);
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 8px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
`;

export const Error = styled.span`
  font-size: 14px;
  color: tomato;
`;

export const VoteWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
`;
export const VoteItem = styled.div`
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 32px;
  background-color: #ededed;
  border-radius: 100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export const VoteContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export interface IVoteList {
  name: string;
  votes_cnt: number;
}

export default function CandidateRegister() {
  const [voteList, setVoteList] = useState<IVoteList[]>([]);
  const [voteName, setVoteName] = useState<String>();
  const [isLoading, setIsLoading] = useState(false);

  // const location = useLocation();
  const navigate = useNavigate();

  const { voterList } = useContext(VoteRegisterContext);

  // const { voterList } = location.state || {};

  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isShowAlreadyAlert, setIsShowAlreadyAlert] = useState(false);

  const [isComplete, setIsComplete] = useState(false);

  const [voteId, setVoteId] = useState();
  const [isToast, setIsToast] = useState(false);

  // const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  // Todo 인풋 삭제 버튼 먹히도록 만들기
  // const [isInputFocused, setIsInputFocused] = useState(false);

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
              mobileWebUrl: `https://ggugitt.com/vote/${voteId}`,
              webUrl: `https://ggugitt.com/vote/${voteId}`,
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
    // const closeTime = currentTime + 5 * 60 * 60 * 1000; // 5시간을 밀리초로 변환
    const closeTime = currentTime + 2 * 60 * 1000; // 2분을 밀리초로 변환
    setVoteName(formattedDate);

    const votesQuery = query(
      collection(db, "vote"),
      orderBy("create_at", "desc"),
      limit(1)
    );
    const snapshot = await getDocs(votesQuery);

    // const lastVoteDoc = (await getDocs(collection(db, "vote"))).docs.pop();
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

  // const handleCopyClipBoard = async (text: string) => {
  //   try {
  //     setIsToast(true);
  //     await navigator.clipboard.writeText(text);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //   }
  // };

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
      {isLoading && <LoadingScreen />}
      <Header isNavigator path="vote-register" />
      {isComplete ? (
        <Success
          message={"투표 등록이 완료 되었습니다!"}
          label="투표 링크 공유하기"
          isShowButton
          isShowSecondaryButton
          // onClick={() => handleCopyClipBoard(`${baseURL}/vote/${voteId}`)}
          onClick={() => shareKakao()}
        />
      ) : (
        <>
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

                      // Todo 인풋 삭제 버튼 먹히도록 만들기
                      // onFocus={() => setIsInputFocused(true)}
                      // onBlur={() => setIsInputFocused(false)}
                    />
                    {/* {isInputFocused && (
                  <img
                    src="/images/icon/common/icon-x-circle.svg"
                    width={20}
                    style={{ cursor: "pointer" }}
                  />
                )} */}
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
                {voterList?.map((member: string, index: number) => (
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
      {/* {isToast && <Toast isComplete message={"클립보드에 복사되었습니다."} />} */}
    </>
  );
}
