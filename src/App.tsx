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

import { Wrapper } from "./style/layout";
import global from "./style/global";
import ForgotPassword from "./routes/reset-password";
import ResetPaswrd from "./routes/reset-password";

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
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Wrapper>
        <Global styles={global} />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    </>
  );
}

export default App;
