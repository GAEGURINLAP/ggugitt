import { useNavigate } from "react-router-dom";
import BottomButton01 from "../component/BottomButon01";
import BrandingTitle from "/images/logo/lg-brandingtitle.png";
import {
  BrandingWrapper,
  Wrapper,
  Title,
  Desc,
  TextWrapper,
  Subtitle,
  HeroImage,
} from "../style/vote-history";

export default function Landing() {
  const navigate = useNavigate();

  const clickConfirm = () => navigate("/login");
  return (
    <>
      <Wrapper>
        <TextWrapper>
          <BrandingWrapper>
            <img src={BrandingTitle} height={48} />
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
            width={500}
            alt="개구린"
          />
        </HeroImage>
      </Wrapper>
      <BottomButton01
        label={"투표 시작하기"}
        onClick={clickConfirm}
        isFloating
      />
    </>
  );
}
