import { createContext } from "react";

export interface IAuthCheckContext {
  // isAuth: boolean;
  isLoading: boolean;
}

export const AuthCheckContext = createContext<IAuthCheckContext>({
  // isAuth: false,
  isLoading: true,
});
