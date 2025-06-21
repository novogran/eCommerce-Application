import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/main", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
}

export default ProtectedRoute;
