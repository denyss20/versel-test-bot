import { useEffect, useState, useMemo, useRef } from "react";

import useGetUserData from "@hooks/api/get/useGetUserData";

import { useTelegramContext } from "@context/useTelegramContext";

import InfoRow from "@ui/components/info-row/InfoRow";
import TokensCount from "@ui/components/tokens-count/TokensCount";
import ProgressBar from "./components/ProgressBar";

import BankaIcon from "./assets/BankaIcon";
import GlassIcon from "./assets/GlassIcon";
import StarIcon from "./assets/StarIcon";

import "./game-page.css";

function GamePage() {
  const maxClicks = 100;
  const [clicksCount, setClicksCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const decrementInterval = useRef<NodeJS.Timeout | null>(null);

  // Function to handle finishing the game
  const finishCallback = async () => {
    // Simulate a successful callback
    const isSuccess = await new Promise((resolve) =>
      setTimeout(() => resolve(true), 1000)
    );
    if (isSuccess) {
      setClicksCount(0);
    }
  };

  // Effect to handle decrement logic
  useEffect(() => {
    if (clicksCount === 0) {
      if (decrementInterval.current) {
        clearInterval(decrementInterval.current);
        decrementInterval.current = null;
      }
      return;
    }

    if (!isActive && clicksCount < maxClicks) {
      decrementInterval.current = setInterval(() => {
        setClicksCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(decrementInterval.current as NodeJS.Timeout);
            decrementInterval.current = null;
            return 0;
          }
        });
      }, 500);
    }

    return () => {
      if (decrementInterval.current) {
        clearInterval(decrementInterval.current);
        decrementInterval.current = null;
      }
    };
  }, [isActive, clicksCount]);

  // Click handler for the icon
  const handleClick = () => {
    setClicksCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= maxClicks) {
        finishCallback();
        setIsActive(false); // To stop decrementing when the callback is successful
      } else {
        setIsActive(true);
        if (decrementInterval.current) {
          clearInterval(decrementInterval.current);
          decrementInterval.current = null;
        }
      }
      return newCount >= maxClicks ? 0 : newCount;
    });
  };

  // Effect to activate decreasing after user stops clicking
  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => {
        setIsActive(false);
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive]);

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

      <TokensCount />

      <div className="banka-icon-wrapper">
        <BankaIcon onClick={handleClick} />
      </div>
      <div className="progress-bar-wrapper">
        <ProgressBar progress={clicksCount} max={maxClicks} />
      </div>
    </div>
  );
}

export default GamePage;
