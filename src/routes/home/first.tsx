import { useNavigate } from "react-router-dom";
import BottomButton01 from "../../component/BottomButon01";
import BrandingTitle from "/images/logo/lg-brandingtitle.png";
import {
  BrandingWrapper,
  Wrapper,
  Title,
  Desc,
  TextWrapper,
  Subtitle,
  HeroImage,
} from "../../style/landing";
import { auth } from "../../firebase";

export default function First() {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const clickConfirm = () => navigate("/login");

  const clickSurvey = () => {
    navigate("/vote-register");
  };

  return (
    <>
      <Wrapper>
        <TextWrapper>
          <BrandingWrapper>
            <img src={BrandingTitle} height={64} />
          </BrandingWrapper>
          <Desc>
            <Title>
              이제 <b>연속적인 투표</b>도 해보세요! <br />
            </Title>
            <Subtitle>
              가끔... 투표가 끊겨서 아쉬운... <br /> 그런 때 있지 않나요?
            </Subtitle>
          </Desc>
        </TextWrapper>
        <HeroImage>
          <img
            src="/images/illust/il-vote-result-square.png"
            style={{ overflow: "hidden", borderRadius: "8px" }}
            width={375}
            height={375}
            alt="개구린"
          />
        </HeroImage>
      </Wrapper>
      <BottomButton01
        label={"투표 시작하기"}
        onClick={user === null ? clickConfirm : clickSurvey}
        isFloating
      />
    </>
  );
}
