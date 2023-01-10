import { useContext, createContext } from "react";

const AuthContext = createContext("");

interface providerProps {
  children: JSX.Element;
  value: any;
}

export function AuthProvider({ children, value }: providerProps) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
