export interface IVoteItemProps {
  isSelected: boolean;
}

export interface IVote {
  vote_id: number;
  vote_list: IVoteList[];
  voter_list: string[];
  vote_name: string;
  vote_winner: string;
  total_votes_cnt: number;
  available_votes_cnt: number;
  already_voters: string[];
  is_complete: boolean;
  close_time: number;
  user_id: string;
  user_name: string;
  create_at: Date;
  id: string;
}

export interface IVoteList {
  name: string;
  votes_cnt: number;
}
