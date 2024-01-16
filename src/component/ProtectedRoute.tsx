import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Alert from "./Alert";
import ButtonPrimary from "./ButtonPrimary";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  const navigate = useNavigate();

  const clickConfirm = () => navigate("/login");

  if (user === null) {
    return (
      <Alert
        message={"로그인이 필요합니다."}
        buttons={[
          <ButtonPrimary label={"확인"} onClick={clickConfirm} isWidthFull />,
        ]}
      />
    );
  }
  return children;
}
