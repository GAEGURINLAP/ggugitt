import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { VoteRegisterContext } from "../../store/vote-register-context";

import BottomButton02 from "../../component/BottomButon02";
import ButtonSecondary from "../../component/ButtonSecondary";
import ButtonPrimary from "../../component/ButtonPrimary";
import Alert from "../../component/Alert";

import { IFormInput } from ".";
import {
  Error,
  Form,
  FormContainer,
  FormWrapper,
  Input,
  Title,
  VoteContent,
  VoteItem,
  VoteWrapper,
  Wrapper,
} from "../../style/vote-register";

export default function VoterRegister() {
  const { voterList, addItem, deleteItem } = useContext(VoteRegisterContext);

  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isShowAlreadyAlert, setIsShowAlreadyAlert] = useState(false);

  const navigate = useNavigate();

  const onRegister = () => {
    navigate("/vote-register/candidate", {
      state: { voterList },
    });
  };

  const clickRegister = () => {
    setIsShowAlert(true);
  };

  const clickDeleteItem = (item: String) => {
    deleteItem(item);
  };

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
                  />
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
