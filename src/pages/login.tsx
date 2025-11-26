import { useContext } from "react";
import { AuthContext } from "@/lib/contexts/auth-context";
import { LoginForm } from "@/components/auth/login-form";
import { LoggedInCard } from "@/components/auth/logged-in-card";
import { Loader } from "lucide-react";
import { VersionToggle } from "@/components/version/version-toggle";

export default function LoginPage() {
  const { user, isUserLoading } = useContext(AuthContext);

  return (
    <main className="w-full mx-auto flex flex-col items-center justify-center py-12">
      <img
        src={"public/gong-io-logo.svg"}
        alt="Gong.io Logo"
        className="w-[300px] h-[100px]"
      />
      {isUserLoading ? (
        <div className="py-8">
          <Loader className="animate-spin" />
        </div>
      ) : user ? (
        <LoggedInCard />
      ) : (
        <LoginForm />
      )}
      <div className="flex flex-row justify-between py-4">
        <VersionToggle page={"login"} />
      </div>
    </main>
  );
}
