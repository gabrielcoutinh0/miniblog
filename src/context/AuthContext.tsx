import { useContext, createContext, ReactNode } from "react";
import { User } from "firebase/auth";

const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  value: User;
}

export function AuthProvider({ children, value }: AuthProviderProps) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
