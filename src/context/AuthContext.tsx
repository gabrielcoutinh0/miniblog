import { useContext, createContext } from "react";
import { User } from "@firebase/auth";

const AuthContext = createContext<null | User>(null);
console.log(AuthContext);
console.log(typeof AuthContext);

export function AuthProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: User;
}) {
  console.log("value: ", value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
