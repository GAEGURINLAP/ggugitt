"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import { ButtonPrimary } from "@/components/ui/custom-button";
import Header from "@/components/header";
import Landing from "@/components/landing";

interface IVote {
  vote_id: string;
  vote_list: any[];
  voter_list: any[];
  vote_name: string;
  vote_winner: string;
  total_votes_cnt: number;
  available_votes_cnt: number;
  already_voters: any[];
  is_complete: boolean;
  close_time: any;
  user_id: string;
  user_name: string;
  create_at: any;
  id: string;
}

export default function VoteHistory() {
  const [votes, setVotes] = useState<IVote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const user = auth.currentUser;

  const fetchVotes = async () => {
    try {
      const votesQuery = query(
        collection(db, "vote"),
        where("user_id", "==", user?.uid),
        orderBy("create_at", "desc")
      );
      const snapshot = await getDocs(votesQuery);

      const votes = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as IVote;
      });
      setVotes(votes);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const clickSurvey = () => {
    router.push("/vote-register");
    localStorage.removeItem("voterList");
    localStorage.removeItem("voteList");
  };

  const skeleton = ["1", "2", "3", "4", "5"];

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="min-h-screen bg-gray-50 p-4">
          <h1 className="text-2xl font-bold text-center mb-8">
            진행하셨던 투표 <br />
            히스토리 입니다.
          </h1>
          <div className="space-y-4">
            {skeleton.map((item, index) => (
              <div
                key={`item${item}${index}`}
                className="bg-white rounded-lg p-4 animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : votes.length > 0 ? (
        <>
          <div className="min-h-screen bg-gray-50 p-4">
            <h1 className="text-2xl font-bold text-center mb-8">
              진행하셨던 투표 <br />
              히스토리 입니다.
            </h1>
            <div className="space-y-4">
              {votes.map((item, index) =>
                item.is_complete ? (
                  <div
                    key={`item${index}`}
                    onClick={() =>
                      router.push(`/vote-history-result/${item.vote_id}`)
                    }
                    className="bg-white rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.vote_name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          1위
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.vote_winner}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">투표 결과</span>
                      <Image
                        src="/images/icon/common/icon-arrow-left.svg"
                        width={24}
                        height={24}
                        className="rotate-180"
                        alt="화살표"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    key={`item${index}`}
                    onClick={() =>
                      router.push(`/vote-progress/${item.vote_id}`)
                    }
                    className="bg-white rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.vote_name}
                      </h3>
                      <span className="text-sm text-blue-600">투표 진행중</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">투표 현황</span>
                      <Image
                        src="/images/icon/common/icon-arrow-left.svg"
                        width={24}
                        height={24}
                        className="rotate-180"
                        alt="화살표"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
            <ButtonPrimary
              label="투표 새로 만들기"
              onClick={clickSurvey}
              isWidthFull
            />
          </div>
        </>
      ) : (
        <Landing />
      )}
    </>
  );
}
