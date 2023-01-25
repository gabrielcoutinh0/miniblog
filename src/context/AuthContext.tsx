import { useContext, createContext } from "react";
import { User } from "@firebase/auth";

const AuthContext = createContext<null | any>(null);

export function AuthProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: any;
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
