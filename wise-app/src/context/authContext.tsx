import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import googleAuth from "@react-native-firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  login: (email: string, password: string) => Promise<{}>;
  logout: () => Promise<{}>;
  signup: (email: string, password: string, name: string) => Promise<{}>;
  isGoogleLogin: boolean;
  setIsGoogleLogin: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isGoogleLogin, setIsGoogleLogin] = useState<boolean>(false);

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
      console.log("RESPONSE : ", response);
      return { success: true };
    } catch (err: any) {
      return { success: false, msg: err.message };
    }
  };

  const logout = async () => {
    try {
      if (isGoogleLogin) {
        setIsGoogleLogin(false);
        await GoogleSignin.revokeAccess();
        await googleAuth().signOut();
      } else {
        await signOut(auth);
      }
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (err: any) {
      let msg = err.message;
      return { success: false, msg, error: err };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const currentAuth: any = getAuth();
      sendEmailVerification(currentAuth.currentUser).then(() => {
        // Email verification sent!
      });
      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        email,
        userId: response?.user?.uid,
      });

      return {
        success: true,
        data: response?.user,
      };
    } catch (err: any) {
      let msg = err.message;
      if (msg.includes("(auth/email-already-in-use)"))
        Alert.alert("Email is already in use");
      return {
        success: false,
        msg: err.message,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        login,
        signup,
        logout,
        isGoogleLogin,
        setIsGoogleLogin,
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
