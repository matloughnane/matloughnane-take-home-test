import { AuthContext } from "@/lib/contexts/auth-context";
import { useContext, type PropsWithChildren } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, isUserLoading } = useContext(AuthContext);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to={"/login"} replace />;
}
