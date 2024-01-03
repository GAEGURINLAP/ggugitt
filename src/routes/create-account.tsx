import styled from "@emotion/styled";

import { useForm } from "react-hook-form";

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

const Error = styled.span`
  margin-left: 20px;
  font-size: 14px;
  color: tomato;
`;

export default function CreateAccount() {
  // Todo
  // 계정 생성
  // 사용자 이름 설정
  // home page로 리다이렉션

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onValid = (data) => {
    if (data.name !== data.password) {
      setError("password", { message: "Password are not the same" });
    }
  };

  const name = watch("name");

  return (
    <>
      <Wrapper>
        <Title>Today's MVP Survey</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...(register("name"), { required: true, maxLength: 10 })}
            name="name"
            type="text"
            placeholder="이름이 뭐에요"
          />
          <p>{name}</p>
          <Input
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
            name="email"
            placeholder="이메일을 입력하렴"
          />
          {errors.email && <Error>{errors.email.message}</Error>}
          <Input
            {...register("password")}
            name="password"
            placeholder="패스워드 뭐에여"
            type="password"
          />
          <Input
            {...register("submit")}
            name="Create Account"
            value="제출하기"
            type="submit"
          />
        </Form>
      </Wrapper>
    </>
  );
}
