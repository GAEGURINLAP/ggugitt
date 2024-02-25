import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { auth } from "./firebase";

import { Global } from "@emotion/react";

import { Container, Wrapper } from "./style/layout";
import global from "./style/global";
// import Splash from "./component/Splash";

import Layout from "./component/Layout";
import LoadingScreen from "./component/LoadingScreen";
import ProtectedRoute from "./component/ProtectedRoute";

import CreateAccount from "./routes/auth/create-account";
import Login from "./routes/auth/login";
import ResetPaswrd from "./routes/auth/reset-password";
import Index from "./routes/home/index";
import Vote from "./routes/vote/vote";
import IndexRegister from "./routes/vote-register/index";
import VoterRegister from "./routes/vote-register/voter";
import VoteProgress from "./routes/vote-progress/vote-progress";
import CandidateRegister from "./routes/vote-register/candidate";
import VoteResult from "./routes/vote-result/vote-result";
import VoteHistoryResult from "./routes/vote-history-result/vote-history-result";
import NotFound from "./routes/404/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Index />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/reset-password", element: <ResetPaswrd /> },
  {
    path: "/vote-register",
    element: (
      <ProtectedRoute>
        <IndexRegister />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <VoterRegister />,
      },
      {
        path: "/vote-register/candidate",
        element: <CandidateRegister />,
      },
    ],
  },
  { path: "/vote/:id", element: <Vote /> },
  {
    path: "/vote-result/:id",
    element: <VoteResult />,
  },
  {
    path: "/vote-history-result/:id",
    element: <VoteHistoryResult />,
  },
  {
    path: "/vote-progress/:id",
    element: (
      <ProtectedRoute>
        <VoteProgress />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // const [progress, setProgress] = useState<number>(0);

  // const handleProgress = () => {
  //   setProgress(100);
  // };

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

  //   const ctxValue: IAuthCheckContext = {
  //     isLoading: isLoading,
  // }

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
      {/* <Splash progress={progress} /> */}
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
