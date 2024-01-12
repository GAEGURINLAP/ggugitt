import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase";

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { IVote } from "../home";

import Alert from "../../component/Alert";
import ButtonPrimary from "../../component/ButtonPrimary";

export default function IndexRegister() {
  const [votes, setVotes] = useState<IVote[]>([]);

  const navigate = useNavigate();

  const user = auth.currentUser;

  const fetchVotes = async () => {
    const votesQuery = query(
      collection(db, "vote"),
      orderBy("create_at", "desc")
    );
    console.log("votesQuery??", votesQuery);
    const snapshot = await getDocs(votesQuery);
    const votes = snapshot.docs.map((doc) => {
      const {
        user_id,
        user_name,
        vote_id,
        vote_list,
        voter_list,
        vote_name,
        total_votes_cnt,
        available_votes_cnt,
        already_voters,
        is_complete,
        create_at,
      } = doc.data();
      return {
        user_id,
        user_name,
        vote_id,
        vote_list,
        voter_list,
        vote_name,
        total_votes_cnt,
        available_votes_cnt,
        already_voters,
        is_complete,
        create_at,
        id: doc.id,
      };
    });
    setVotes(votes);
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <>
      {votes[0]?.user_id === user?.uid && votes[0].is_complete === false ? (
        <Alert
          message={"아직 진행중인 투표가 있습니다!"}
          buttons={[
            <ButtonPrimary
              label={"투표 보러가기"}
              onClick={() => navigate("/")}
              isWidthFull
            />,
          ]}
        />
      ) : (
        <Outlet />
      )}
    </>
  );
}
