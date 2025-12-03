import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import {
  authenticateUser,
  authenticateUserWithSecret,
} from "../utils/auth-utils";
import type { User } from "../services/user-service";

interface AuthContextProps {
  user: User | null;
  isUserLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  useExactVersion: boolean;
  toggleVersion: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isUserLoading: false,
  login: (email: string, password: string) => {
    console.log({ email, password });
    return new Promise(() => {
      return false;
    });
  },
  logout: () => console.log("placeholder logout fn"),
  useExactVersion: false,
  toggleVersion: () => console.log("placeholder exact fn"),
});

export function AuthProvider({ children }: PropsWithChildren) {
  // SETTING DEFAULT STATE
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [useExactVersion, setUseExactVersion] = useState<boolean>(false);

  // LOGIN AUTOMATICALLY IF THE USER ALREADY EXISTS IN LOCAL STORAGE
  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsUserLoading(true);
        const secret = localStorage.getItem("authSecret");
        if (secret) {
          const authenticatedUser = await authenticateUserWithSecret(secret);
          if (authenticatedUser) {
            setUser(authenticatedUser);
          }
        } else {
          console.info("No session to restore");
        }
      } catch (error) {
        console.error("Failed to restore session: ", error);
      } finally {
        setIsUserLoading(false);
      }
    };

    initAuth();
  }, []);

  const toggleVersion = () => {
    setUseExactVersion(!useExactVersion);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authSecret");
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user: authenticatedUser, secret } = await authenticateUser(
        email,
        password
      );
      if (authenticatedUser) {
        // MAKING IT AVAILBLE FOR RELOADING
        localStorage.setItem("authSecret", secret);
        // SET USER
        setUser(authenticatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        login,
        logout,
        useExactVersion,
        toggleVersion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
