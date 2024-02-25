import styled from "@emotion/styled";
import { IVoteItemProps } from "../../service/vote/type";

export const History = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding-top: 12px;
  cursor: pointer;

  &:hover {
    svg {
      path {
        fill: var(--main);
      }
    }
    h4 {
      color: var(--main);
    }
  }
`;

export const Refresh = styled.div`
  cursor: pointer;
  padding-bottom: 8px;
`;

export const HistoryLabel = styled.h4`
  font-size: 16px;
`;

export const HistroyArrow = styled.div`
  svg {
    width: 24px;
    height: 24px;
    transform: rotate(0.5turn);
    transition: fill 0.3s ease-out;
  }
`;

export const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 120px;
  /* height: 100vh; */
  padding-bottom: 160px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 64px;
  text-align: center;
  font-weight: 300;
  line-height: 150%;
  b {
    font-weight: 700;
    color: red;
  }
`;

export const CurrentTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CurrentTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
  b {
    color: var(--main);
  }
`;

export const CurrentVote = styled.div`
  /* margin-top: 48px; */
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const VoteTitle = styled.h2`
  text-align: center;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
`;
export const VoteItem = styled.div<IVoteItemProps>`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 32px;
  color: ${({ isSelected }) => (isSelected ? "var(--white)" : "var(--black)")};
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--main)" : "#ededed"};
  border-radius: 100px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover,
  :active {
    color: var(--white);
    background-color: var(--main);
  }
`;

export const VoteResultList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;
export const VoteResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 24px;
  align-self: stretch;
`;
export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Name = styled.div<{ isVoteWinner?: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.isVoteWinner && "var(--main)"};
`;
export const VotesCnt = styled.div<{ isVoteWinner: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.isVoteWinner && "var(--main)"};
`;

export const Bar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #edf0f3;
  border-radius: 100px;
  overflow: hidden;
`;

export const Fill = styled.div<{
  votesCnt: number;
  totalVotesCnt: number;
  isVoteWinner: boolean;
}>`
  width: ${(props) => Math.ceil((props.votesCnt / props.totalVotesCnt) * 100)}%;
  height: 8px;
  background-color: ${(props) =>
    props.isVoteWinner ? "var(--main)" : "#b0b7be"};
`;

export const VoterContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.h3`
  font-size: 14px;
  color: #525252;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
`;

export const Member = styled.div`
  display: flex;
  padding: 2px 12px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 32px;
  background-color: #ededed;
  border-radius: 100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
