import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TUserData = {
  tokens: number;
};

export interface AppContextType {
  tokensLiquidity: number;
  setTokensLiquidity: React.Dispatch<React.SetStateAction<number>>;

  userData: TUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<TUserData | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook for accessing the context
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /*
   * Context data
   */
  const [tokensLiquidity, setTokensLiquidity] = useState<number>(0);
  const [userData, setUserData] = useState<TUserData | null>(null);

  /* Context object */
  const value = {
    tokensLiquidity,
    setTokensLiquidity,

    userData,
    setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
