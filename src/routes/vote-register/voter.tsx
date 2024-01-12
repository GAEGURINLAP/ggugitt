import styled from "@emotion/styled";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import BottomButton02 from "../../component/BottomButon02";
import Alert from "../../component/Alert";
import ButtonSecondary from "../../component/ButtonSecondary";
import ButtonPrimary from "../../component/ButtonPrimary";

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

export default function VoterRegister() {
  const [voterList, setVoterList] = useState<string[]>([]);

  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isShowAlreadyAlert, setIsShowAlreadyAlert] = useState(false);

  const navigate = useNavigate();

  // Todo 인풋 삭제 버튼 먹히도록 만들기
  // const [isInputFocused, setIsInputFocused] = useState(false);

  const onRegister = () => {
    navigate("/vote-register/candidate", {
      state: { voterList },
    });
  };

  const addItem = async (data: IFormInput) => {
    const { member_name } = data;

    if (voterList.some((name) => name === member_name)) {
      setIsShowAlreadyAlert(true);
      return;
    } else {
      const newVoteItems = [...voterList, member_name];
      setVoterList(newVoteItems);
    }
  };

  const deleteItem = (itemToDelete: string) => {
    const updatedVoteItems = voterList.filter((item) => item !== itemToDelete);
    setVoterList(updatedVoteItems);
  };

  // const clickAddItem = () => {
  //   handleSubmit(addItem)();
  // };

  const clickRegister = () => {
    setIsShowAlert(true);
  };

  const clickDeleteItem = (item: string) => {
    deleteItem(item);
  };

  interface IFormInput {
    member_name: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  return (
    <>
      <>
        <Wrapper>
          <Title>
            경기에 참여한 <br /> 팀원을 먼저 등록해주세요
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
                    {...register("member_name", {
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
              {errors.member_name && (
                <Error>{errors.member_name.message}</Error>
              )}
            </div>
            <VoteWrapper>
              {voterList.map((item, index) => (
                <VoteItem key={`item${index}`}>
                  <VoteContent>
                    {item}
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
        {voterList.length === 0 ? (
          <BottomButton02
            label01={"추가하기"}
            onClick01={handleSubmit((data) => {
              addItem(data);
              reset();
            })}
            label02={"등록하기"}
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
      </>
      {isShowAlert && (
        <Alert
          message={"투표할 팀원들이 맞습니까?"}
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
          message={"이미 추가한 팀원입니다!"}
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
