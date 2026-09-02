import { createContext } from "react";

export type User = {
  id: number;
  email: string;
  role: "user" | "admin";
  is_active: boolean;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | null>(null);
