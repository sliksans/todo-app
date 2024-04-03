import { User, UserCredential } from 'firebase/auth';
import React from "react";

export type AuthValue = {
  createUser: (email: string, password: string) => Promise<UserCredential | null>,
  user: User | null,
  loginUser: (email: string, password: string) => Promise<UserCredential | null>,
  logOut: () => Promise<void>,
  loadingUser: boolean,
  authError: string,
  setAuthError: (error: string) => void,
};

export const AuthContext = React.createContext<AuthValue | null>(null);