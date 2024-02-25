import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { IVote } from "../routes/home";

interface IUseFetchVotes {
  id: string | undefined;
}

export default function useFetchVotes({ id }: IUseFetchVotes) {
  const [vote, setVote] = useState<IVote>();
  const [isLoading, setIsLoading] = useState(true);

  const newId = Number(id);

  const fetchVotes = async () => {
    try {
      const votesQuery = query(collection(db, "vote"));
      const snapshot = await getDocs(votesQuery);

      const votes = snapshot.docs.map((doc) => {
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
        } = doc.data();
        return {
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
          id: doc.id,
        };
      });

      const newVote = votes.find((vote) => vote.vote_id === newId);
      setVote(newVote);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  return { vote, isLoading };
}
