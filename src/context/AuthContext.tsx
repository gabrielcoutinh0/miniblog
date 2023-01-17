import { useContext, createContext } from "react";
import { User } from "@firebase/auth";

const AuthContext = createContext<null | User>(null);

export function AuthProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: User;
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
