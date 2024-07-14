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

  /**
   * Prevent zoom on mobile devices
   **/

  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", preventZoom, { passive: false });
    document.addEventListener("touchend", preventZoom, { passive: false });
    document.addEventListener("touchmove", preventZoom, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventZoom);
      document.removeEventListener("touchend", preventZoom);
      document.removeEventListener("touchmove", preventZoom);
    };
  }, []);

  return (
    <div className="app">
      <Routes />
    </div>
  );
}

export default App;
