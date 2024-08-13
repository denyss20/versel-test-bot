import React from "react";
import ReactDOM from "react-dom/client";

import { TelegramContextProvider } from "@context/useTelegramContext";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <TelegramContextProvider>
      <App />
    </TelegramContextProvider>
  </React.StrictMode>
);
