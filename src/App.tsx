import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { router } from "./router";
//
import { auth } from "./firebase";
//
import { Global } from "@emotion/react";
import global from "./style/global";
import { Container, Wrapper } from "./style/layout";
//
import LoadingScreen from "./component/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // const handleButtonClick = () => {
  //   // 알림 권한 다시 요청
  //   requestNotificationPermission();
  // };

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
    // initFCM();
    // 알림 권한 다시 요청
    // requestNotificationPermission();
    // handleProgress();
  }, []);

  return (
    <>
      <Helmet>
        <title>꾸깃 - 꾸준히 한 곳에서 투표해요!</title>
        <meta name="description" content="꾸준히 한 곳에서 투표해요!" />
        <meta property="og:title" content="꾸깃" />
        <meta
          property="og:image"
          content="/images/illust/il-vote-progress-landscape.png"
        />
        <meta property="og:url" content="https://ggugitt.com/" />
      </Helmet>
      <Container>
        <Wrapper>
          <Global styles={global} />
          {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        </Wrapper>
      </Container>
    </>
  );
}
export default App;
