import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Helmet } from 'react-helmet-async';

import { auth } from "./firebase";

import { Global } from "@emotion/react";

import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";

import Layout from "./component/Layout";
import LoadingScreen from "./component/LoadingScreen";
import ProtectedRoute from "./component/ProtectedRoute";

import { Container, Wrapper } from "./style/layout";
import global from "./style/global";
import ResetPaswrd from "./routes/reset-password";
import Splash from "./component/Splash";

import NotFound from "./routes/not-found";
import Vote from "./routes/vote";
import VoterRegister from "./routes/vote-register/voter";
import CandidateRegister from "./routes/vote-register/candidate";
import IndexRegister from "./routes/vote-register";
import VoteResult from "./routes/vote-result";
import VoteHistory from "./routes/vote-history";
import VoteHistoryResult from "./routes/vote-history-result";

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
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
  const [progress, setProgress] = useState<number>(0);

  const handleProgress = () => {
    setProgress(100);
  };

  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
    handleProgress();
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>불개미 불개미!</title>
        <meta name="description" content="MOM MOM" />
        <meta property="og:image" content="/images/logo/404.png" />
        <meta property="og:url" content="https://bullgaemi-survey.web.app/" />
      </Helmet> */}
      <Splash progress={progress} />
      <Container>
        <Wrapper>
          <Global styles={global} />
          {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
          {/* <BottomButton /> */}
        </Wrapper>
      </Container>
    </>
  );
}

export default App;
