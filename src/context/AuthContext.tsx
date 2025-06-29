import { useEffect, useState, type PropsWithChildren } from "react";
import { getTokenObject } from "../shared/utils/auth-token";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const tokenObject = getTokenObject();

    if (tokenObject && !tokenObject?.scope.includes("create_anonymous_token")) {
      setIsLoggedIn(true);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
