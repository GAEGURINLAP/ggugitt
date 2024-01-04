import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

import Alert from "../component/Alert";
import ButtonPrimary from "../component/ButtonPrimary";

import { Error, Form, Input, Switcher, Title, Wrapper } from "../style/form";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export default function Login() {
  // Todo
  // 계정 생성
  // 사용자 이름 설정
  // home page로 리다이렉션

  const [isLoading, setLoading] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({});

  const onSubmit = async (data: FormInputs) => {
    const { email, password } = data;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      // setError
      if (e instanceof FirebaseError) {
        // console.log(e.code, e.message);
        setShowAlert(true);
        setError(e.message);
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
        <Title>불개미 로그인</Title>
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
            placeholder="이메일 뭐에요"
          />
          {errors.email && <Error>{errors.email.message}</Error>}
          <Input
            {...register("password", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: {
                value: 8,
                message: "8자리 이상 비밀번호를 사용하세요.",
              },
            })}
            id="password"
            placeholder="패스워드 뭐에요"
            type="password"
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <ButtonPrimary
            label={isLoading ? "Loading..." : "로그인"}
            isRadiusFull
          />
        </Form>
        <Switcher>
          계정이 없으신가요? {""}
          <Link to="/create-account">회원 가입 &rarr;</Link>
        </Switcher>
      </Wrapper>

      {isShowAlert && (
        <Alert
          message={error}
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
