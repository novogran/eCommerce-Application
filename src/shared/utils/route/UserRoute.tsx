import { useEffect, type PropsWithChildren } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

function UserRoute({ children }: PropsWithChildren) {
  const { isLoggedIn, isLoading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isLoading && pathname.startsWith("/user")) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate, pathname, isLoading]);

  return children;
}

export default UserRoute;
