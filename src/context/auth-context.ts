import { createContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };
