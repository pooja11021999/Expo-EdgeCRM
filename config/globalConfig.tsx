import { API_URL } from "@/constants/Api";
import { useSession } from "@/context/ctx";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import { get } from "./axioscall";

interface UserStatus {
  blocked?: boolean;
  payment_blocked?: boolean;
  active?: boolean;
  delete?: boolean;
  [key: string]: any;
}

interface GlobalConfigContextProps {
  userStatus: UserStatus;
  checkUserStatus: () => void;
  handleUserStatus: (data: object) => void;
}

const GlobalConfigContext = createContext<GlobalConfigContextProps | undefined>(
  undefined
);

export const useGlobalConfig = () => {
  const context = useContext(GlobalConfigContext);
  if (!context) {
    throw new Error("useGlobalConfig must be used within GlobalConfigProvider");
  }
  return context;
};

interface GlobalConfigProviderProps {
  children: any;
}

export const GlobalConfigProvider: React.FC<GlobalConfigProviderProps> = ({
  children,
}) => {
  const { session } = useSession();
  const signal = axios.CancelToken.source();
  const [userStatus, setUserStatus] = useState<UserStatus>({});

  const handleUserStatus = (data: object) => {
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      ...data,
    }));
  };

  const checkUserStatus = () => {
    get({
      url: `${API_URL}/user-status`,
      params: {
        api_token: session,
        cancelToken: signal.token,
      },
    })
      .then((response) => {
        const user_status = response.data.data as UserStatus;
        setUserStatus(user_status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <GlobalConfigContext.Provider
      value={{
        userStatus,
        checkUserStatus,
        handleUserStatus,
      }}
    >
      {children}
    </GlobalConfigContext.Provider>
  );
};

const GlobalConfig: React.FC = () => {
  return <View />;
};

export default GlobalConfig;
