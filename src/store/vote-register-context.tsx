import { createContext } from "react";
import { IFormInput } from "../routes/vote-register";

export interface IVoteRegisterContext {
  voterList: String[];
  addItem: (data: IFormInput) => void;
  deleteItme: (itemToDelete: String) => void;
}

export const VoteRegisterContext = createContext<IVoteRegisterContext>({
  voterList: [],
  addItem: () => {},
  deleteItme: () => {},
});
