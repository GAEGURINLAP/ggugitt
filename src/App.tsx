import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

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

import VoteRegister from "./routes/vote-register";
import Vote from "./routes/vote";
import NotFound from "./routes/not-found";
import ErrorBoundary from "./component/ErrorBoundary";

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
  { path: "/vote-register", element: <VoteRegister /> },
  { path: "/vote", element: <Vote /> },
  { path: "/vote/:id", element: <Vote /> },
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
