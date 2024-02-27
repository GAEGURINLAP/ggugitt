import { auth } from "../../firebase";

import Landing from "./first";
import VoteHistory from "./vote-history";

export default function Index() {
  const user = auth.currentUser;

  if (user === null) {
    return <Landing />;
  }
  return <VoteHistory />;
}
