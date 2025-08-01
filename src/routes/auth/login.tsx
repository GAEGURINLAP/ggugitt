import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

import Alert from "../../component/Alert";
import ButtonPrimary from "../../component/ButtonPrimary";
import DevBadge from "../../component/DevBadge";

import {
  Error,
  ForgotPassword,
  Form,
  Image,
  Input,
  StyledLink,
  Switcher,
  Title,
  TitleContainer,
  Wrapper,
} from "../../style/form";

interface FormInputs {
  email: string;
  password: string;
}

export const ButtonKakao = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #fee500;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 100px;
  gap: 4px;
`;

export default function Login() {
  // Todo
  // 계정 생성
  // 사용자 이름 설정
  // home page로 리다이렉션

  const user = auth.currentUser;

  const [isLoading, setLoading] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  // const [error, setError] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user !== null) {
  //     navigate("/");
  //     alert("이미 로그인하셨어요!");
  //   }
  // }, []);

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
      if (e instanceof FirebaseError) {
        setShowAlert(true);
        console.log(e.message);
        // setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const clickConfirm = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   if (!window.Kakao.isInitialized()) {
  //     window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
  //   }
  //   return;
  // }, []);

  // const onLoginWithKakao = () => {
  //   const redirectUri = `${location.origin}/callback/kakaotalk`;
  //   // const scope = [
  //   //   KAKAO_SCOPE_NICKNAME,
  //   //   KAKAO_SCOPE_GENDER,
  //   //   KAKAO_SCOPE_BIRTHDAY,
  //   // ].join(",");

  //   window.Kakao.Auth.authorize({
  //     redirectUri,
  //     // scope,
  //   });
  // };

  if (user === null) {
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
          <TitleContainer>
            <Title>
              <b>꾸깃</b> 로그인
            </Title>
            <DevBadge />
          </TitleContainer>
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
            <Input
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요.",
                },
              })}
              id="password"
              placeholder="패스워드를 입력해주세요"
              type="password"
            />
            {errors.password && <Error>{errors.password.message}</Error>}
            <ForgotPassword>
              <StyledLink to="/reset-password">
                비밀번호를 잊으셨나요?
              </StyledLink>
            </ForgotPassword>
            <ButtonPrimary
              label={isLoading ? "로딩 중입니다..." : "로그인"}
              isRadiusFull
              isWidthFull
            />
          </Form>
          {/* <ButtonKakao onClick={onLoginWithKakao}>
          <img src="/images/logo/logo-kakao.svg" alt="카카오톡" width={20} />
          카카오 로그인
        </ButtonKakao> */}
          <Switcher>
            계정이 없으신가요? {""}
            <StyledLink to="/create-account">회원 가입 &rarr;</StyledLink>
          </Switcher>
        </Wrapper>
        {isShowAlert && (
          <Alert
            message={"로그인 정보가 틀렸어요!"}
            // message={error}
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

  return (
    <Alert
      message={"이미 로그인 하셨습니다!"}
      // message={error}
      buttons={[
        <ButtonPrimary label={"확인"} onClick={clickConfirm} isWidthFull />,
      ]}
    />
  );
}
