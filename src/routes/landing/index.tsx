import { BrandingWrapper, GNB, Menu } from './style';

import BrandingTitleSm from '/images/logo/lg-brandingtitle-sm.png';
import MenuButton from '/images/icon/common/icon-menu.svg';

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
      <div>랜딩이 될 예정</div>
      <div>바디가 들어갈 공간</div>
      <div>서브 바디가 들어갈 공간</div>
      <div>섹션이 들어갈 공간</div>
    </>
  );
}
