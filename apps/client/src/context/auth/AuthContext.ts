import { createContext } from "react";
import {
  SignInCredentials,
  SignUpCredentials,
} from "../../features/authentication/types";
type AuthContextType = {
  access_token: string | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => Promise<void>;
};
export const AuthContext = createContext<AuthContextType>(
  undefined as any as AuthContextType
);
