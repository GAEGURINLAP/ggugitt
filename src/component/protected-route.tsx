import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Alert from "./alert";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  console.log(user);

  const navigate = useNavigate();

  const clickConfirm = () => navigate("/login");

  if (user === null) {
    return (
      <>
        <Alert error={"로그인이 필요합니다."} onConfirm={clickConfirm}></Alert>
        {/* <Navigate to="/login" /> */}
      </>
    );
  }
  return children;
}
