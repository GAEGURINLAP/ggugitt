import styled from '@emotion/styled';

export const GNB = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: 48px;
  background-color: white;
`;

export const BrandingWrapper = styled.div``;
export const Menu = styled.div``;

export const Wrapper = styled.div`
  margin-top: 48px;
`;
export const Section01 = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d3f7f9;
  gap: 32px;
  height: 720px;
`;

export const Section01TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 2;
  align-items: center;
`;

export const Section01Title = styled.div`
  font-size: 32px;
  text-align: center;
  line-height: 150%;
  font-weight: 700;
  color: #121212;
`;

export const Section01Desc = styled.div`
  font-size: 20px;
  text-align: center;
  line-height: 150%;
  color: #525252;
`;

export const Section01ImgWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 720px;
  z-index: 1;
`;
