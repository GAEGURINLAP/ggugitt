import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { auth, initFCM, requestNotificationPermission } from "./firebase";

import { Global } from "@emotion/react";

import Login from "./routes/login";
import CreateAccount from "./routes/create-account";

import LoadingScreen from "./component/LoadingScreen";
import ProtectedRoute from "./component/ProtectedRoute";

import { Container, Wrapper } from "./style/layout";
import global from "./style/global";
import ResetPaswrd from "./routes/reset-password";
// import Splash from "./component/Splash";

import NotFound from "./routes/not-found";
import Vote from "./routes/vote";
import VoterRegister from "./routes/vote-register/voter";
import CandidateRegister from "./routes/vote-register/candidate";
import IndexRegister from "./routes/vote-register";
import VoteResult from "./routes/vote-result";
import VoteHistory from "./routes/vote-history";
import VoteProgress from "./routes/vote-progress";
import VoteHistoryResult from "./routes/vote-history-result";
import Layout from "./component/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <VoteHistory />,
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
    path: "/vote-history",

    element: (
      <ProtectedRoute>
        <VoteHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  // const [progress, setProgress] = useState<number>(0);

  // const handleProgress = () => {
  //   setProgress(100);
  // };

  const handleButtonClick = () => {
    // 알림 권한 다시 요청
    requestNotificationPermission();
  };

  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
    initFCM();
    // 알림 권한 다시 요청
    requestNotificationPermission();
    // handleProgress();
  }, []);

  useEffect(() => {
    // 페이지 로딩 후 알림 권한 요청 다이얼로그 표시
    if (!isLoading) {
      requestNotificationPermission();
    }
  }, [isLoading]);

  return (
    <>
      <Helmet>
        <title>꾸깃 - 꾸잇? 꾸잇!</title>
        <meta name="description" content="꾸깃꾸우깃" />
        <meta property="og:title" content="뚜잇뚜잇츄" />
        <meta property="og:image" content="/images/illust/illust-ggugitt.png" />
        <meta property="og:url" content="https://ggugit.com/" />
      </Helmet>
      {/* <Splash progress={progress} /> */}
      <Container>
        <Wrapper>
          <Global styles={global} />
          {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
          {/* <RouterProvider router={router} /> */}
          <button onClick={handleButtonClick}>알림 권한 요청</button>
        </Wrapper>
      </Container>
    </>
  );
}

export default App;
