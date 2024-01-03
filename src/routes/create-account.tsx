import styled from "@emotion/styled";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Button = styled.button`
  height: 48px;
  background-color: #528ff9;
  color: white;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #417bde;
  }
`;

const Error = styled.span`
  margin-left: 20px;
  font-size: 14px;
  color: tomato;
`;

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export default function CreateAccount() {
  // Todo
  // 계정 생성
  // 사용자 이름 설정
  // home page로 리다이렉션

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
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
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (data) {
      // setError
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>Join Our Bullgaemi</Title>
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
            placeholder="이메일을 입력하렴"
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
            placeholder="패스워드 뭐에여"
            type="password"
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <Button type="submit" disabled={isSubmitting}>
            {isLoading ? "Loading..." : "회원 가입"}
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}
