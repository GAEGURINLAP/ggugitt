import { IVote } from "../service/vote/type";

interface IUseShareKaKao {
  vote: IVote | undefined;
  id: number | undefined;
}

export default function useShareKaKao() {
  const initKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      try {
        window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
      } catch (error) {
        console.error("Kakao init error:", error);
      }
    }
  };

  const kakaoShareVote = ({ vote, id }: IUseShareKaKao) => {
    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `${vote?.vote_name} 꾸깃할 시간이에요!`,
          description: "오늘의 투표 후보는 과연 누구일까요?! \n두구두구두구",
          imageUrl: import.meta.env.VITE_KAKAO_THUMB_VOTE,
          link: {
            mobileWebUrl: `${import.meta.env.VITE_APP_BASE_URL}`,
            webUrl: `${import.meta.env.VITE_APP_BASE_URL}`,
          },
        },
        buttons: [
          {
            title: "당장 투표하러 가기",
            link: {
              mobileWebUrl: `${import.meta.env.VITE_APP_BASE_URL}/vote/${id}`,
              webUrl: `${import.meta.env.VITE_APP_BASE_URL}/vote/${id}`,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Kakao share error:", error);
    }
  };

  const kakaoShareVoteReuslt = ({ vote, id }: IUseShareKaKao) => {
    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `${vote?.vote_name}의 우승자는 과연?!`,
          description: "긴장하고 들어오세요! 하 궁금해...",
          imageUrl: import.meta.env.VITE_KAKAO_THUMB_VOTE_RESULT,
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
    } catch (error) {
      console.error("Kakao share error:", error);
    }
  };

  return {
    initKakao,
    kakaoShareVote,
    kakaoShareVoteReuslt,
  };
}
