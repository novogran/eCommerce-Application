import { useEffect, useState, type PropsWithChildren } from "react";
import { getAuthToken } from "../shared/utils/auth-token";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  );
}
