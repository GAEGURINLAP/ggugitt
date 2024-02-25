import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { auth } from "../firebase";

import useFetchVotes from "../hooks/useFetchVotes";

import {
  Wrapper,
  CurrentTitle,
  CurrentTitleWrapper,
  CurrentVote,
  VoteResultList,
  VoteResult,
  Content,
  Name,
  VotesCnt,
  Bar,
  Fill,
} from "./home";
import { WrapperMid, Title } from "../style/vote-result";

import Header from "../component/Header";
import LoadingScreen from "../component/LoadingScreen";
import BottomButton01 from "../component/BottomButon01";
import ButtonPrimary from "../component/ButtonPrimary";

export default function VoteHistoryResult() {
  const navigate = useNavigate();

  const { id } = useParams();

  const user = auth.currentUser;

  const shareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_KAKAO_KEY);
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${vote?.vote_name}의 우승자는 과연?!`,
          description: "긴장하고 들어오세요! 하 궁금해...",
          imageUrl: `${import.meta.env.VITE_KAKAO_THUMB_VOTE_RESULT}`,
          link: {
            mobileWebUrl: `${import.meta.env.VITE_APP_BASE_URL}`,
            webUrl: `${import.meta.env.VITE_APP_BASE_URL}`,
          },
        },
        buttons: [
          {
            title: "당장 확인하러 가기",
            link: {
              mobileWebUrl: `${
                import.meta.env.VITE_APP_BASE_URL
              }/vote-result/${id}`,
              webUrl: `${import.meta.env.VITE_APP_BASE_URL}/vote-result/${id}`,
            },
          },
        ],
      });
    }
  };

  const { vote, isLoading } = useFetchVotes({ id: id as string });

  return (
    <>
      <Helmet>
        <title>꾸깃 - 투표 결과</title>
        <meta name="description" content="투표 결과" />
        <meta property="og:title" content="꾸깃" />
        <meta
          property="og:image"
          content="/images/illust/il-vote-progress-landscape.png"
        />
        <meta property="og:url" content="https://ggugitt.com/vote-progress" />
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) : vote?.user_id === user?.uid ? (
        vote?.is_complete ? (
          <>
            <Header isNavigator path="" />
            <Wrapper>
              <CurrentVote>
                <CurrentTitleWrapper>
                  <CurrentTitle>
                    {vote?.vote_name} <br />
                    투표 결과입니다.
                    <br />
                    우승자는 <b>{vote?.vote_winner}</b>입니다!!
                  </CurrentTitle>
                </CurrentTitleWrapper>
                <VoteResultList>
                  {vote?.vote_list.map((item, index) => (
                    <VoteResult key={`item${index}`}>
                      <Content>
                        <Name isVoteWinner={item.name === vote.vote_winner}>
                          {item.name}
                        </Name>
                        <VotesCnt
                          isVoteWinner={item.name === vote?.vote_winner}
                        >
                          {item.votes_cnt}명
                        </VotesCnt>
                      </Content>
                      <Bar>
                        <Fill
                          votesCnt={item.votes_cnt}
                          totalVotesCnt={vote?.total_votes_cnt}
                          isVoteWinner={item.name === vote?.vote_winner}
                        />
                      </Bar>
                    </VoteResult>
                  ))}
                </VoteResultList>
              </CurrentVote>
            </Wrapper>
            <BottomButton01
              label={"투표 결과 공유하기"}
              onClick={() => shareKakao()}
            />
          </>
        ) : (
          <WrapperMid>
            <img
              src="/images/illust/illust-noitem.svg"
              width={320}
              height={320}
            />
            <Title>
              아직 종료되지 않은 <br /> 투표입니다!
            </Title>
            <ButtonPrimary
              label="메인으로 가기"
              isWidthFull
              onClick={() => navigate("/")}
            />
          </WrapperMid>
        )
      ) : (
        <WrapperMid>
          <img
            src="/images/illust/illust-noitem.svg"
            width={240}
            height={240}
          />
          <Title>다른 유저의 투표입니다!</Title>
          <ButtonPrimary
            label="메인으로 가기"
            isWidthFull
            onClick={() => navigate("/")}
          />
        </WrapperMid>
      )}
    </>
  );
}
