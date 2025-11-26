import { useContext } from "react";
import { Button } from "../ui/button";
import { AuthContext } from "@/lib/contexts/auth-context";
import { Loader } from "lucide-react";
import { Link } from "react-router";
import { LogoutButton } from "./log-out-button";

export function LoggedInButton() {
  const { user, isUserLoading, useExactVersion } = useContext(AuthContext);
  return isUserLoading ? (
    <Button>
      <Loader className="animate-spin" />
    </Button>
  ) : user ? (
    <div className="flex flex-row items-center gap-4">
      {`Hi, ${user?.firstName}`}
      <LogoutButton />
    </div>
  ) : (
    <Link to={useExactVersion ? "/exact/login" : "/login"}>
      <Button>{`Login`}</Button>
    </Link>
  );
}
