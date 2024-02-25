import { createContext } from "react";

export interface IAlertContext {
  isOpen: boolean;
  title?: string;
  message: string;
  subMessage?: string;
  isShowTitle?: boolean;
  isShowSubMessege?: boolean;
  buttons: React.ReactNode[];
}

export const AlertContext = createContext<IAlertContext>({
  isOpen: false,
  title: "",
  message: "",
  subMessage: "",
  isShowTitle: false,
  isShowSubMessege: false,
  buttons: [],
});
