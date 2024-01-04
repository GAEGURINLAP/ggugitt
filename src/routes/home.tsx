import styled from "@emotion/styled";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

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
    <Navigate to="/login" />;
    console.log(auth.currentUser);
  };
  return (
    <>
      <Title>Welcome to Bullgaemi FC MVP Suvery!</Title>
      <Button onClick={logOut}>로그아웃</Button>
    </>
  );
}
