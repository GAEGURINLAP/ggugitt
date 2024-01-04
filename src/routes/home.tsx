import styled from "@emotion/styled";
import { auth } from "../firebase";

const Title = styled.h1`
  color: hotpink;
  font-size: 48px;
  margin-top: 80px;
`;

const Button = styled.button`
  padding: 24px;
  background-color: white;
`;

export default function Home() {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <>
      <Title>Welcome to Bullgaemi FC MVP Suvery!</Title>
      <Button onClick={logOut}>로그아웃</Button>
    </>
  );
}
