import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import Alert from "../component/Alert";
import ButtonPrimary from "../component/ButtonPrimary";

import {
  Wrapper,
  Title,
  Form,
  Input,
  Error,
  Switcher,
  StyledLink,
} from "../style/form";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
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
    const { name, email, password } = data;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, e.message);
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
        <img src="/images/logo/404.png" alt="개구린" width={180} height={180} />
        <Title>
          <b>불개미</b> 회원가입
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", {
              required: "이름은 필수 입력입니다.",
              minLength: {
                value: 2,
                message: "이름은 2자 이상이어야 합니다.",
              },
              maxLength: {
                value: 10,
                message: "이름은 10자를 초과할 수 없습니다.",
              },
            })}
            id="name"
            type="text"
            placeholder="이름이 뭐에요"
          />
          {errors.name && <Error>{errors.name.message}</Error>}
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
            label={isLoading ? "Loading..." : "회원가입"}
            isRadiusFull
            isWidthFull
          />
        </Form>
        <Switcher>
          계정이 이미 있으신가요? {""}
          <StyledLink to="/login">로그인 &rarr;</StyledLink>
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
