import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import Alert from "../../component/Alert";
import ButtonPrimary from "../../component/ButtonPrimary";

import {
  Wrapper,
  Title,
  Form,
  Input,
  Error,
  Switcher,
  StyledLink,
  Image,
} from "../../style/form";

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({});

  const onSubmit = async (data: FormInputs) => {
    const { name, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }
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
        console.log(e.message);
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
          <b>꾸깃</b> 회원가입
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
            placeholder="이름을 입력해주세요"
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
          <Input
            {...register("confirmPassword", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: {
                value: 8,
                message: "8자리 이상 비밀번호를 사용하세요.",
              },
            })}
            id="password2"
            placeholder="패스워드를 한번 더 입력해주세요"
            type="password"
          />
          {errors.confirmPassword && (
            <Error>{errors.confirmPassword.message}</Error>
          )}
          <ButtonPrimary
            label={isLoading ? "로딩중입니다..." : "회원가입"}
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
          message={"다시 한 번 확인해주세요!"}
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
