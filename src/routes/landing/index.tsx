import {
  BrandingWrapper,
  GNB,
  Menu,
  Section01,
  Section01Desc,
  Section01ImgWrapper,
  Section01Title,
  Section01TitleWrapper,
  Wrapper,
} from './style';

import BrandingTitleSm from '/images/logo/lg-brandingtitle-sm.png';
import MenuButton from '/images/icon/common/icon-menu.svg';
import Section01Img from '/images/illust/il-landing-section-01.webp';
import ButtonPrimary from '../../component/ButtonPrimary';

export default function Landing() {
  return (
    <>
      <GNB>
        <BrandingWrapper>
          <img src={BrandingTitleSm} height={20} />
        </BrandingWrapper>
        <Menu>
          <img src={MenuButton} height={24} />
        </Menu>
      </GNB>
      <Wrapper>
        <Section01>
          <Section01TitleWrapper>
            <Section01Title>
              끈김없는 연속적인 <br /> 투표 서비스
            </Section01Title>
            <Section01Desc>
              가끔... 투표가 끊겨서 아쉬운, <br />
              그런 때 있지 않나요?
            </Section01Desc>
            <ButtonPrimary label="첫 투표 시작하기" />
          </Section01TitleWrapper>
          <Section01ImgWrapper>
            <img src={Section01Img} alt="히어로 이미지" width={390} />
          </Section01ImgWrapper>
        </Section01>
      </Wrapper>
    </>
  );
}
