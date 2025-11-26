import { useContext } from "react";
import { Button } from "../ui/button";
import { AuthContext } from "@/lib/contexts/auth-context";
import { useNavigate } from "react-router";

interface VersionToggleProps {
  page: "login" | "hierarchy";
}

export function VersionToggle({ page }: VersionToggleProps) {
  const { useExactVersion, toggleVersion } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        // SET EXACT PREFERENCE
        toggleVersion();
        // NAVIGATE
        if (useExactVersion) {
          navigate(`/${page}`);
        } else {
          navigate(`/exact/${page}`);
        }
      }}
    >
      {useExactVersion ? "Use ML Version" : "Use Exact Design"}
    </Button>
  );
}
