import { auth } from "../firebase";

import Landing from "./landing";
import VoteHistory from "./vote-history";

export default function Index() {
  // const { isLoading } = useContext(AuthCheckContext);

  const user = auth.currentUser;

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  if (user === null) {
    return <Landing />;
  }
  return <VoteHistory />;
}