import { useContext } from "react";
import { Button } from "../ui/button";
import { AuthContext } from "@/lib/contexts/auth-context";
import { useNavigate } from "react-router";

export function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logUserOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button className="w-min" variant={"outline"} onClick={logUserOut}>
      Logout
    </Button>
  );
}
