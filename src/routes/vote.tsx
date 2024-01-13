import styled from "@emotion/styled";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  // limit,
  // orderBy,
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
  Input,
} from "./vote-register/voter";

import { useForm } from "react-hook-form";
import Toast from "../component/Toast";
import LoadingScreen from "../component/LoadingScreen";

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  height: 100%;
  padding-bottom: 80px;
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

export default function Vote() {
  const [vote, setVote] = useState<IVote>();
  // const [successMessege, isSuccessMessege] = useState('');

  const [isShowAlertVote, setShowAlertVote] = useState(false);
  const [isShowAlertConfirm, setShowAlertConfirm] = useState(false);
  const [isShowAlertVoterFail, setIsShowAlertVoterFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isToast, setIsToast] = useState(false);

  const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  // const [voterList, setVoterList] = useState<string[]>([]);

  // const [voterName, setVoterName] = useState("");

  const [isVoter, setIsVoter] = useState(false);

  // const [voteID, setVoteID] = useState(false);

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const { id } = useParams();

  const navigate = useNavigate();

  const user = auth.currentUser;

  const NewID = Number(id);

  console.log("id 숫자 맞아?", typeof NewID);

  const fetchVotes = async () => {
    const q = query(
      collection(db, "vote")
      // orderBy("create_at", "desc"),
      // limit(1)
    );
    console.log("q??", q);

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

    const voteID = snapshot.docs.pop()?.data().vote_id;
    setVoteID(voteID);

    // if (!newVote) {
    //   navigate("/not-found");
    // }

    setVote(newVote);

    // const voterList = snapshot.docs.pop()?.data().voter_list;
    // setVoterList(voterList);
  };

  interface IFormInput {
    name: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  console.log("vote??", vote);

  const clickVote = () => {
    setShowAlertVote(true);
  };

  const clickConfim = async (data: IFormInput) => {
    const { name } = data;

    if (vote?.voter_list.some((item) => item === name)) {
      setIsVoter(true);
      // setVoterName(name);
    } else {
      setIsShowAlertVoterFail(true);
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
      clearTimeout(timeout); // 컴포넌트가 unmount되거나 상태가 업데이트되면 타이머를 클리어
    };
  }, [isToast]);
  // const clickVoteConfirm = () => {
  //   setShowAlertConfirm(true);
  // };

  const onRegister = async () => {
    if (selectedItemIndex !== null) {
      const selectedList = vote?.vote_list[selectedItemIndex];
      console.log("selectedList가 뭐야?", selectedList);

      let VotesCnt = selectedList?.votes_cnt || 0;
      let TotalVotesCnt = vote?.total_votes_cnt || 0;
      let AvailableVotesCnt = vote?.available_votes_cnt || 0;

      VotesCnt += 1;
      TotalVotesCnt += 1;
      AvailableVotesCnt -= 1;

      console.log("id가 id가 맞을까?", id);

      const q = query(
        collection(db, "vote"),
        where("vote_id", "==", NewID) // useParams로부터 얻은 id를 사용
        // limit(1)
      );
      console.log("쿼리는 잘 들어갔는가?", q);

      const querySnapshot = await getDocs(q);

      console.log("쿼리 스냅샷은 잘들어갔는가?", querySnapshot);

      setShowAlertVote(false);
      setIsLoading(true);

      if (!querySnapshot.empty) {
        try {
          const voteDocRef = querySnapshot.docs[0].ref;
          console.log("그래서 잘 받아온거 맞아?", voteDocRef);
          await updateDoc(voteDocRef, {
            vote_list: vote?.vote_list.map((item, index) =>
              index === selectedItemIndex
                ? { ...item, votes_cnt: VotesCnt }
                : item
            ),
            total_votes_cnt: TotalVotesCnt,
            available_votes_cnt: AvailableVotesCnt,
            already_voters: user?.uid || null,
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
      {isShowAlertConfirm ? (
        <Success
          message={"투표 완료 되었습니다!"}
          label="다른 팀원 투표 강요하기"
          isShowButton
          onClick={() => handleCopyClipBoard(`${baseURL}/vote/${NewID}`)}
        />
      ) : isVoter ? (
        <>
          <Wrapper>
            <CurrentVote>
              <CurrentTitle>
                <b>{vote?.vote_name}</b>의 불개미를 <br />
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
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                        placeholder="팀원 이름을 입력해주세요"
                      />
                    </FormWrapper>
                  </Form>
                  {errors.name && <Error>{errors.name.message}</Error>}
                </div>
              </FormContainer>
            </CurrentVote>
          </Wrapper>
          <BottomButton01 onClick={handleSubmit(clickConfim)} label={"확인"} />
        </>
      )}

      {isShowAlertVoterFail && (
        <Alert
          message={"투표권이 없는 이름입니다! ㅠㅠ"}
          buttons={[
            <ButtonPrimary
              label={"다시 입력"}
              onClick={() => setIsShowAlertVoterFail(false)}
              isWidthFull
            />,
          ]}
        />
      )}
      {isToast && <Toast message={"클립보드에 복사되었습니다."} />}
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
          message={"종료된 투표입니다!"}
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
