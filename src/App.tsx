import { useEffect } from "react";

import Routes from "@routes/Routes";

import { useTelegram } from "@hooks/useTelegram";

import "./App.css";

function App() {
  const { tg, isInitialized } = useTelegram();

  useEffect(() => {
    if (isInitialized) {
      tg?.ready();
      tg?.expand();
    }
  }, [isInitialized, tg]);

  return (
    <div className="app">
      <Routes />
    </div>
  );
}

export default App;
