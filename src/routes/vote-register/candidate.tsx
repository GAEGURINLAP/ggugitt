import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { VoteRegisterContext } from "../../store/vote-register-context";

import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import {
  Error,
  Form,
  FormContainer,
  FormWrapper,
  // GuideText,
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
import useShareKaKao from "../../hooks/useShareKakao";
import useFetchVotes from "../../hooks/useFetchVotes";

import { IVoteList } from "../../service/vote/type";

export default function CandidateRegister() {
  const [voteId, setVoteId] = useState();
  const [voteList, setVoteList] = useState<IVoteList[]>([]);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isShowAlreadyAlert, setIsShowAlreadyAlert] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { voterList } = useContext(VoteRegisterContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IVoteList>({});

  const { vote, isLoading, setIsLoading } = useFetchVotes({
    id: voteId,
  });

  const { initKakao, kakaoShareVote } = useShareKaKao();

  const clickSharingKaKaoVote = () => {
    initKakao();
    kakaoShareVote({ vote, id: voteId });
  };

  const user = auth.currentUser;

  // 기능: 후보자 등록 완료
  const onRegister = async () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}년 ${
      currentDate.getMonth() + 1
    }월 ${currentDate.getDate()}일`;
    const currentTime = Date.now();
    const closeTime = currentTime + 2 * 60 * 1000; // 2분을 밀리초로 변환

    const votesQuery = query(
      collection(db, "vote"),
      orderBy("create_at", "desc"),
      limit(1)
    );
    const snapshot = await getDocs(votesQuery);

    const voteId = (snapshot.docs.pop()?.data().vote_id || 0) + 1;

    try {
      setIsLoading(true);
      setIsShowAlert(false);

      const highestVote = voteList.reduce(
        (prev, current) =>
          current.votes_cnt > prev.votes_cnt ? current : prev,
        { name: "", votes_cnt: 0 }
      );

      await addDoc(collection(db, "vote"), {
        vote_id: voteId,
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
      setVoteId(voteId);
    } catch (error) {
      console.error("Kakao share error:", error);
    } finally {
      setIsComplete(true);
      setIsLoading(false);
    }
  };

  // 기능: 후보자 추가
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

  // 이벤트: 등록하기
  const clickRegister = () => {
    setIsShowAlert(true);
  };

  // 이벤트: 아이템 제거
  const clickDeleteItem = (item: IVoteList) => {
    deleteItem(item);
  };

  // 기능: 후보자 삭제
  const deleteItem = (itemToDelete: IVoteList) => {
    const updatedVoteItems = voteList.filter((item) => item !== itemToDelete);
    setVoteList(updatedVoteItems);
  };

  // 기능: 투표자 등록 되돌아가기
  const clickNavigateVoter = () => {
    navigate("/vote-register");
  };

  return (
    <>
      {isLoading && <LoadingScreen isDim />}

      {isComplete ? (
        <Success
          message={"투표 등록이 완료 되었어요!"}
          label="투표 링크 공유하기"
          isShowButton
          isShowSecondaryButton
          onClick={clickSharingKaKaoVote}
        />
      ) : (
        <>
          <Header isNavigator path="vote-register" />
          <Wrapper>
            <Title>
              투표 항목을 <br /> 등록해주세요
            </Title>
            <FormContainer>
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
                          "특수문자,공백,숫자,영문은 입력이 불가능 해요.",
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
                    placeholder="투표 항목을 입력해주세요"
                  />
                </FormWrapper>
              </Form>
              {errors.name && <Error>{errors.name.message}</Error>}
              {voteList.length > 0 && (
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
              )}
            </FormContainer>
            <VoterContainer>
              <Label>등록된 투표자</Label>
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
              message={"투표자를 먼저 등록해주세요!"}
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
          message={"입력한 투표 항목이 전부 맞을까요?"}
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
          message={"이미 추가한 후보에요!"}
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
