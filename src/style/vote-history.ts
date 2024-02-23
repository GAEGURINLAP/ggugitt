import styled from "@emotion/styled";

export const Wrapper = styled.div`
  /* padding: 0 24px; */
  padding-top: 120px;
  /* height: 100vh; */
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TextWrapper = styled.div`
  display: flex;
  padding: 0 24px;
  flex-direction: column;
  gap: 48px;
`;

export const BrandingWrapper = styled.div`
  /* font-size: 64px; */
`;

export const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  line-height: 140%;
  b {
    font-weight: 700;
  }
`;
export const HistoryTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
  padding: 0 24px;
`;

export const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -4%;
  color: #525252;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 160px;
`;

export const HeroImage = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
`;

export const NoItemLabel = styled.div`
  font-size: 20px;
  color: #a2a2a2;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f2f2f2;
  transition: all 0.3s ease-out;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const WrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const WrapperRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export const Name = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;
export const Status = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const StatusProgress = styled.label`
  font-size: 16px;
  color: var(--main);
`;

export const WinnerLabel = styled.h4`
  color: #a2a2a2;
  font-size: 16px;
`;
export const WinnerName = styled.h4`
  /* color: #525252; */
`;

export const SkeletonItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f2f2f2;
  &:last-child {
    border-bottom: none;
  }
`;

export const SkeletonWrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

export const SkeletonName = styled.div`
  background-color: #f0f0f0;
  height: 18px;
  width: 70%;
  border-radius: 8px;
`;
export const SkeletonStatus = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

export const SkeletonStatusProgress = styled.div`
  background-color: #f0f0f0;
  height: 16px;
  width: 30%;
  border-radius: 8px;
`;

export const NoItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f2f2f2;
  &:last-child {
    border-bottom: none;
  }
`;
