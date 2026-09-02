import { useContext, useState, type ReactNode } from "react";
import { UserContext } from "./userContext";
import type { User, UserContextType } from "./userContext";

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
