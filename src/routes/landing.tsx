import { useNavigate } from "react-router-dom";
import BottomButton01 from "../component/BottomButon01";
import { Wrapper, Title, NoItem } from "../style/vote-history";

export default function Landing() {
  const navigate = useNavigate();

  const clickConfirm = () => navigate("/login");
  return (
    <>
      <Wrapper>
        <Title>
          오늘의 꾸깃 <br />
          시작해보세요!
        </Title>
        <NoItem>
          <img
            src="/images/logo/splash.png"
            alt="개구린"
            width={240}
            height={240}
          />
        </NoItem>
      </Wrapper>
      <BottomButton01 label={"투표 시작하기"} onClick={clickConfirm} />
    </>
  );
}
