import styled from "@emotion/styled";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

import { useForm } from "react-hook-form";
import { useState } from "react";

import LoadingScreen from "../component/LoadingScreen";
import BottomButton02 from "../component/BottomButon02";
import Success from "../component/Success";
import Alert from "../component/Alert";
import ButtonSecondary from "../component/ButtonSecondary";
import ButtonPrimary from "../component/ButtonPrimary";
import { useLocation } from "react-router-dom";

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

export default function VoteRegister() {
  const [voteList, setVoteList] = useState<IVoteList[]>([]);

  console.log("초기 voteList는?", voteList);

  const [isLoading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [voteId, setVoteId] = useState();

  const location = useLocation();

  const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  // Todo 인풋 삭제 버튼 먹히도록 만들기
  // const [isInputFocused, setIsInputFocused] = useState(false);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;

  const onRegister = async () => {
    const user = auth.currentUser;

    const lastVoteDoc = (await getDocs(collection(db, "vote"))).docs.pop();
    const voteID = (lastVoteDoc?.data().vote_id || 0) + 1;

    try {
      setLoading(true);
      setIsShowAlert(false);
      await addDoc(collection(db, "vote"), {
        vote_id: voteID,
        vote_list: voteList,
        vote_name: `${formattedDate}의 불개미 MVP는?`,
        total_votes_cnt: 0,
        available_votes_cnt: 11,
        already_voters: null,
        is_complete: false,
        user_id: user?.uid,
        user_name: user?.displayName || "Anonymous",
        create_at: Date.now(),
      });
      setVoteId(voteID);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setIsComplete(true);
      setLoading(false);
    }
  };

  const addItem = async (data: IVoteList) => {
    const { name } = data;
    const newVoteItems = [...voteList, { name, votes_cnt: 0 }];
    setVoteList(newVoteItems);
  };

  const deleteItem = (itemToDelete: IVoteList) => {
    const updatedVoteItems = voteList.filter((item) => item !== itemToDelete);
    setVoteList(updatedVoteItems);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  const clickAddItem = () => {
    handleSubmit(addItem)();
  };

  const clickRegister = () => {
    setIsShowAlert(true);
  };

  const clickDeleteItem = (item: IVoteList) => {
    deleteItem(item);
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
      {isComplete ? (
        <Success
          message={"투표 등록이 완료 되었습니다!"}
          label="투표 링크 공유하기"
          isShowButton
          onClick={() => handleCopyClipBoard(`${baseURL}/vote/${voteId}`)}
        />
      ) : (
        <>
          <Wrapper>
            <Title>
              투표를 진행할 <br /> 후보를 등록해주세요
            </Title>
            <FormContainer>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
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
                {voteList.map((item, index) => (
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
          </Wrapper>
          {voteList.length === 0 ? (
            <BottomButton02
              onClick01={clickAddItem}
              isDisabled
              label01={"추가하기"}
              label02={"등록하기"}
            />
          ) : (
            <BottomButton02
              onClick01={clickAddItem}
              onClick02={clickRegister}
              label01={"추가하기"}
              label02={"등록하기"}
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
    </>
  );
}
