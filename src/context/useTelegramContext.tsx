import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface TelegramContextType {
  webApp: Telegram["WebApp"] | null;
  setWebApp: React.Dispatch<React.SetStateAction<Telegram["WebApp"] | null>>;
}

const TelegramContext = createContext<TelegramContextType | undefined>(
  undefined
);

// Custom hook for accessing the context
export const useTelegramContext = () => {
  const context = useContext(TelegramContext);

  if (!context) {
    throw new Error(
      "useTelegramContext must be used within a TelegramContextProvider"
    );
  }
  return context;
};

export const TelegramContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /*
   * Context data
   */
  const [webApp, setWebApp] = useState<Telegram["WebApp"] | null>(null);

  /*
   * Load the Telegram WebApp script
   * to be able to use the Telegram WebApp API
   */
  useEffect(() => {
    // Load the Telegram Web App script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.onload = () => {
      const app = (window as any).Telegram?.WebApp;
      if (app) {
        app.ready();
        app.expand();

        setWebApp(app);
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  /* Context object */
  const value = useMemo(
    () => ({
      webApp,
      setWebApp,
    }),
    [webApp]
  );

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};
