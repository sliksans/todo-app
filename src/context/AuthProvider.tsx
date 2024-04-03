import {
  useEffect,
  useState,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { AuthContext, AuthValue } from "../context/AuthContext";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [authError, setAuthError] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      console.log("onAuthStateChanged:", firebaseUser);
      setUser(firebaseUser);
      setLoadingUser(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = async (email: string, password: string) => {
    setLoadingUser(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential.user) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
        });
      }
      return userCredential;
    } catch (error) {
      const err = error as FirebaseError;
      setAuthError(err.message);
      return null;
    } finally {
      setLoadingUser(false);
    }
  };

  const loginUser = async (email: string, password: string) => {
    setLoadingUser(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential;
    } catch (error) {
      const err = error as FirebaseError;
      setAuthError(err.message);
      return null;
    } finally {
      setLoadingUser(false);
    }
  };

  const logOut = async () => {
    setLoadingUser(true);
    try {
      await signOut(auth);
    } catch (error) {
      const err = error as FirebaseError;
      setAuthError(err.message);
    } finally {
      setLoadingUser(false);
    }
  };

  const authValue: AuthValue = {
    createUser,
    user,
    loginUser,
    logOut,
    loadingUser,
    authError,
    setAuthError,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
