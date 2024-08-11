import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";

import { doc, getDoc, setDoc } from "firebase/firestore";
interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  isAdminVerified: boolean;
  login: (email: string, password: string) => Promise<{}>;
  logout: () => Promise<{}>;
  signup: (email: string, password: string, name: string) => Promise<{}>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdminVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdminVerified, setIsAdminVerified] = useState<boolean>(false);

  useEffect(() => {
    // Simulate authentication check
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user?.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  }, []);

  const updateUserData = async (userId: any) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, name: data?.name, userId: data?.userId });
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      console.log("RESPONSE : ", response);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err };
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out");
      await signOut(auth);
      return { success: true };
      // Implement logout logic here
    } catch (err: any) {
      console.error(err);
      return { success: false, msg: err.message, error: err };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Response user: ", response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        email,
        userId: response?.user?.uid,
        doctor: true,
      });
      setIsAuthenticated(true);
      return {
        success: true,
        data: response?.user,
      };
    } catch (err: any) {
      let msg = err.message;
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "Entered email is already in use";
      return {
        success: false,
        msg,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        setIsAuthenticated,
        isAdminVerified,
        setIsAdminVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
