import { useEffect, useState } from "react";

import useGetUserData from "@hooks/api/get/useGetUserData";

import { useTelegramContext } from "@context/useTelegramContext";

import ProgressBar from "./components/ProgressBar";

import BankaIcon from "./assets/BankaIcon";

import "./game-page.css";

function GamePage() {
  const [count, setCount] = useState(0);

  const { webApp } = useTelegramContext();

  const { getUserDataRequest } = useGetUserData();

  useEffect(() => {
    if (webApp?.initData) {
      getUserDataRequest(webApp.initData);
    }
  }, [webApp]);

  return (
    <div className="game-page">
      <div>
        <div className="banka-icon-wrapper">
          <BankaIcon onClick={() => setCount((count) => count + 1)} />
        </div>

        <div className="progress-bar-wrapper">
          <ProgressBar progress={count} max={100} />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
