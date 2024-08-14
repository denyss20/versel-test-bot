import { useEffect, useState } from "react";

import useGetUserData from "@hooks/api/get/useGetUserData";

import { useTelegramContext } from "@context/useTelegramContext";

import ProgressBar from "./components/ProgressBar";
import TokensCount from "@ui/components/tokens-count/TokensCount";

import BankaIcon from "./assets/BankaIcon";

import "./game-page.css";

function GamePage() {
  const [count, setCount] = useState(0);

  const { webApp } = useTelegramContext();

  const { getUserDataRequest } = useGetUserData();

  /* Get users data on load */
  useEffect(() => {
    if (webApp?.initData) {
      getUserDataRequest(webApp.initData);
    }
  }, [webApp]);

  /* Render */
  return (
    <div className="game-page">
      <div>
        <div className="banka-icon-wrapper">
          <BankaIcon onClick={() => setCount((count) => count + 1)} />
        </div>

        <TokensCount />
        <div className="progress-bar-wrapper">
          <ProgressBar progress={count} max={100} />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
