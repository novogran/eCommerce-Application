import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { getAuthToken } from "../shared/utils/auth-token";
function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      navigate("/main", { replace: true });
    }
  }, [navigate]);

  return children;
}

export default ProtectedRoute;
