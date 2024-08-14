import { useEffect, useState, useMemo } from "react";

import useGetUserData from "@hooks/api/get/useGetUserData";

import { useTelegramContext } from "@context/useTelegramContext";

import InfoRow from "@ui/components/info-row/InfoRow";
import ProgressBar from "./components/ProgressBar";
import TokensCount from "@ui/components/tokens-count/TokensCount";

import BankaIcon from "./assets/BankaIcon";
import GlassIcon from "./assets/GlassIcon";
import StarIcon from "./assets/StarIcon";

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

  const renderTopInfoRows = useMemo(() => {
    return (
      <div className="top-info-rows">
        <InfoRow
          icon={<GlassIcon />}
          label="Total mined banks"
          value={"10 / 9 000 000 000 000"}
        />
        <InfoRow icon={<StarIcon />} label="Your level" value={1} />
      </div>
    );
  }, []);

  /* Render */
  return (
    <div className="game-page">
      {renderTopInfoRows}

      <div className="banka-icon-wrapper">
        <BankaIcon onClick={() => setCount((count) => count + 1)} />
      </div>

      <TokensCount />
      <div className="progress-bar-wrapper">
        <ProgressBar progress={count} max={100} />
      </div>
    </div>
  );
}

export default GamePage;
