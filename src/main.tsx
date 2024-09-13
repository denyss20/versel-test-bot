import React from "react";
import ReactDOM from "react-dom/client";

import { TelegramContextProvider } from "@context/useTelegramContext";
import { AppContextProvider } from "@context/useAppContext";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <TelegramContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </TelegramContextProvider>
  </React.StrictMode>
);
