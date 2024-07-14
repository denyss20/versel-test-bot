import { useEffect, useState } from "react";

export function useTelegram() {
  const [tg, setTg] = useState<Telegram["WebApp"] | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if Telegram.WebApp is available
    if (window.Telegram && window.Telegram.WebApp) {
      setTg(window.Telegram.WebApp);
      setIsInitialized(true);
    } else {
      console.error("Telegram Web App library not loaded yet.");
    }
  }, []);

  const onClose = () => {
    tg?.close();
  };

  const onToggleButton = () => {
    if (tg && tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg?.MainButton.show();
    }
  };

  return {
    tg,
    isInitialized,
    onClose,
    onToggleButton,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
  };
}
