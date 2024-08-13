import { useEffect } from "react";
import eruda from "eruda";

import Routes from "@routes/Routes";

import "./App.css";

// Initialize eruda for dev mode only [debugging]
// TODO: Remove this block of code in production
eruda.init();

// Main App Component
function App() {
  /*
   * Prevent zoom on mobile devices
   */
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

  /* Render */
  return (
    <div className="app">
      <Routes />
    </div>
  );
}

export default App;
