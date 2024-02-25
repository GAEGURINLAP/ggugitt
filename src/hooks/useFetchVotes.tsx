import { useEffect, useState } from "react";

import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

import { IVote } from "../service/vote/type";

interface IUseFetchVotes {
  id: number | undefined;
}

export default function useFetchVotes({ id }: IUseFetchVotes) {
  const [vote, setVote] = useState<IVote>();
  const [notVoterList, setNotVoterList] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const user = auth.currentUser;

  const voteQuery = async (userId: string | undefined) => {
    const q = query(
      collection(db, "vote"),
      where("user_id", "==", userId),
      where("vote_id", "==", id),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  };

  const fetchVotes = async () => {
    try {
      const querySnapshot = await voteQuery(user?.uid);
      console.log("user?.uid", user?.uid);

      const voteDoc = querySnapshot.docs[0];
      if (voteDoc) {
        const {
          vote_id,
          vote_list,
          voter_list,
          vote_name,
          vote_winner,
          total_votes_cnt,
          available_votes_cnt,
          already_voters,
          is_complete,
          close_time,
          user_id,
          user_name,
          create_at,
        } = voteDoc.data();

        setVote({
          vote_id,
          vote_list,
          voter_list,
          vote_name,
          vote_winner,
          total_votes_cnt,
          available_votes_cnt,
          already_voters,
          is_complete,
          close_time,
          user_id,
          user_name,
          create_at,
          id: voteDoc.id,
        });

        const voterList = voteDoc.data().voter_list;

        const alreadyVoterList = voteDoc.data().already_voters;
        const notVoterList = voterList.filter(
          (voter: string) => !alreadyVoterList.includes(voter)
        );
        setNotVoterList(notVoterList);
      }
    } catch (err) {
      console.log("Firebase Error Message", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  return { vote, notVoterList, isLoading, setIsLoading, voteQuery };
}
