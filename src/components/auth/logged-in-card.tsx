import { Link } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/lib/contexts/auth-context";

export function LoggedInCard() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="text-center">
      <h1 className="pb-8 py-4 text-xl font-semibold">You Are Logged In</h1>
      <Card className="w-3xl mx-auto p-8">
        <div className="flex flex-col gap-8 items-center">
          <Link to="/hierarchy">
            <Button className="w-min">Continue To Hierarchy</Button>
          </Link>
          <Button className="w-min" variant={"ghost"} onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}
