import { useState } from "react";
import { useForm } from "react-hook-form";

import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";

import Alert from "../../component/Alert";
import ButtonPrimary from "../../component/ButtonPrimary";

import { Error, Form, Image, Input, Title, Wrapper } from "../../style/form";

interface FormInputs {
  email: string;
}

export default function ForgotPassword() {
  const [isLoading, setLoading] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  // const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({});

  const onSubmit = async (data: FormInputs) => {
    const { email } = data;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
      setShowAlert(true);
    } catch (e) {
      // Todo 1. 존재하는 이메일 여부 판단 로직 추가 필요
      // Todo 2. 성공, 실패에 따라 Alert 메세지가 다르게 나타도록
      if (e instanceof FirebaseError) {
        setShowAlert(true);
        console.log(e.code);
        // setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Wrapper>
        <Image>
          <img
            src="/images/illust/il-vote-progress-square.png"
            alt="꾸깃"
            width={180}
            height={180}
          />
        </Image>
        <Title>
          <b>비밀번호</b> 재설정
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
            id="email"
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && <Error>{errors.email.message}</Error>}

          <ButtonPrimary
            label={isLoading ? "로딩중입니다..." : "비밀번호 재설정"}
            isRadiusFull
            isWidthFull
          />
        </Form>
      </Wrapper>

      {isShowAlert && (
        <Alert
          message={
            "입력하신 이메일로 비밀번호 재설정을 위한 이메일이 발송되었습니다."
          }
          buttons={[
            <ButtonPrimary
              label={"확인"}
              onClick={handleAlertClose}
              isWidthFull
            />,
          ]}
        />
      )}
    </>
  );
}
