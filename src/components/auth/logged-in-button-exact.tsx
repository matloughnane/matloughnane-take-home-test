import { useContext } from "react";
import { Button } from "../ui/button";
import { AuthContext } from "@/lib/contexts/auth-context";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { getUserFullName } from "@/lib/utils/string-utils";

export function LoggedInButtonExact() {
  const { user, logout, isUserLoading, useExactVersion } =
    useContext(AuthContext);
  const navigate = useNavigate();

  //
  const logUserOut = () => {
    logout();
    navigate("/exact/login");
  };

  return isUserLoading ? (
    <Button>
      <Loader className="animate-spin" />
    </Button>
  ) : user ? (
    <div className="flex flex-row items-center gap-2">
      {getUserFullName(user.firstName, user.lastName)}
      <Button className="text-blue-500" variant={"link"} onClick={logUserOut}>
        (Logout)
      </Button>
    </div>
  ) : (
    <Link to={useExactVersion ? "/exact/login" : "/login"}>
      <Button>{`Login`}</Button>
    </Link>
  );
}
