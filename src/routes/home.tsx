import styled from "@emotion/styled";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../component/button";

const Title = styled.h1`
  color: hotpink;
  font-size: 48px;
  margin-top: 80px;
`;

// const Button = styled.button`
//   padding: 24px;
//   background-color: white;
// `;

export default function Home() {
  const navigate = useNavigate();

  const logOut = () => {
    auth.signOut();
    navigate(0);
  };
  return (
    <>
      <Title>불개미 MVP 투표에 오신 것을 환영합니다</Title>
      {/* <Button onClick={logOut}>로그아웃</Button> */}
      <Button onClick={logOut} label={"로그아웃"} />
    </>
  );
}
