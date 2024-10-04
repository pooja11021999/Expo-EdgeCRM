import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";
import { useStorageState } from "./useStorageState";
import { API_URL } from "@/constants/Api";
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  loginData?: any;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // const [[isLoading, session], setSession] = useStorageState("session");
  const [session, setSession] = useStorageState<string | null>("session", null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await axios({
        method: "POST",
        url: `${API_URL}/login`,
        params: {
          email,
          password,
          mobile: 1,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const token = result.data.meta.api_token;

      setLoginData(result.data);
      setSession(token);
      setIsLoading(false);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      router.replace("/");

      return { token };
    } catch (e) {
      console.log("error+++", e);
      setIsLoading(false);
      Alert.alert((e as any).response.data.error);
      return { error: true, msg: (e as any).response.data.error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          await login(email, password);
          // Perform sign-in logic here
          // setSession("xxx");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        loginData,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
