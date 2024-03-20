import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase";

import {
  IVoteRegisterContext,
  VoteRegisterContext,
} from "../../store/vote-register-context";

import Alert from "../../component/Alert";
import ButtonPrimary from "../../component/ButtonPrimary";

import { IVote } from "../../service/vote/type";

export interface IFormInput {
  member_name: string;
}

export default function IndexRegister() {
  const storedVoterListString = localStorage.getItem("voterList");

  const storedVoterList = storedVoterListString
    ? JSON.parse(storedVoterListString)
    : [];

  const [votes, setVotes] = useState<IVote[]>([]);
  const [voterList, setVoterList] = useState<String[]>(storedVoterList);

  useEffect(() => {
    localStorage.setItem("voterList", JSON.stringify(voterList));
  }, [voterList]);

  const [isShowAlreadyAlert, setIsShowAlreadyAlert] = useState(false);

  const navigate = useNavigate();

  const user = auth.currentUser;

  const fetchVotes = async () => {
    const votesQuery = query(
      collection(db, "vote"),
      orderBy("create_at", "desc")
    );
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
    setVotes(votes);
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const addItem = (data: IFormInput) => {
    const { member_name } = data;

    if (voterList.some((name) => name === member_name)) {
      setIsShowAlreadyAlert(true);
      return;
    } else {
      const newVoteItems = [...voterList, member_name];
      setVoterList(newVoteItems);
    }
  };

  const deleteItem = (itemToDelete: String) => {
    const updatedVoteItems = voterList.filter((item) => item !== itemToDelete);
    setVoterList(updatedVoteItems);
  };

  const ctxValue: IVoteRegisterContext = {
    voterList: voterList,
    addItem: addItem,
    deleteItem: deleteItem,
  };

  return (
    <>
      <VoteRegisterContext.Provider value={ctxValue}>
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
      </VoteRegisterContext.Provider>
      {isShowAlreadyAlert && (
        <Alert
          message={"이미 추가한 투표자에요!"}
          buttons={[
            <ButtonPrimary
              label={"확인"}
              onClick={() => setIsShowAlreadyAlert(false)}
              isWidthFull
            />,
          ]}
        />
      )}
    </>
  );
}
