import { createBrowserRouter } from "react-router-dom";

import Layout from "./component/Layout";

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
import Landing from "./routes/landing";

export const router = createBrowserRouter([
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
    path: "/landing",
    element: <Landing />,
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
