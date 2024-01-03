import { RouterProvider, createBrowserRouter } from "react-router-dom";

import reset from "./reset";
import { Global } from "@emotion/react";

import Layout from "./component/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { useEffect, useState } from "react";
import LoadingScreen from "./component/loading-screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    // Firebase 기다리기
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Global styles={reset} />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
