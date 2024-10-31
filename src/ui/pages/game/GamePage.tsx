import { useCallback, useEffect, useState, useMemo, useRef } from "react";

import useGetUserData from "@hooks/api/get/useGetUserData";
import useGetTokensLiquidityData from "@hooks/api/get/useGetTokensLiquidityData";
import useAddNewToken from "@hooks/api/post/useAddNewToken";

import { useTelegramContext } from "@context/useTelegramContext";
import { useAppContext } from "@context/useAppContext";

import InfoRow from "@ui/components/info-row/InfoRow";
import TokensCount from "@ui/components/tokens-count/TokensCount";
import ProgressBar from "./components/ProgressBar";
import CoinsLoop from "./components/CoinsLoop";

import helper from "./utils/helper";

import GlassIcon from "./assets/GlassIcon";
import StarIcon from "./assets/StarIcon";

import "./game-page.css";

const maxClicks = 100;
const animationCycleDuration = 1500;
const decrementIntervalMs = 300;

function GamePage() {
  /* API requests */
  const { getUserDataRequest } = useGetUserData();
  const { getTokensLiquidityDataRequest } = useGetTokensLiquidityData();
  const { addNewTokenRequest } = useAddNewToken();

  /* State */
  const { webApp } = useTelegramContext();
  const { tokensLiquidity, userData } = useAppContext();
  const { tokens } = userData || { tokens: 0 };

  const [clicksCount, setClicksCount] = useState(0);
  const [isCoinLoopVisible, setIsCoinLoopVisible] = useState(false);

  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const decrementInterval = useRef<NodeJS.Timeout | null>(null);

  /* Get users data on load */
  useEffect(() => {
    if (webApp?.initData) {
      getUserDataRequest(webApp.initData);
      getTokensLiquidityDataRequest();
    }
  }, [webApp]);

  /* Handlers */

  // Function to handle finishing the game
  const finishCallback = useCallback(async (tappedTokens: number) => {
    console.warn("finish callback");
    const isSuccess = await addNewTokenRequest(tappedTokens);

    if (isSuccess) {
      setClicksCount(0);
    }
  }, []);

  // Click handler for the icon
  const handleClick = () => {
    setIsCoinLoopVisible(true);

    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }

    hideTimeout.current = setTimeout(() => {
      setIsCoinLoopVisible(false);
    }, animationCycleDuration);

    setClicksCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === maxClicks) {
        finishCallback(newCount);
      }

      if (decrementInterval.current) {
        clearInterval(decrementInterval.current);
        decrementInterval.current = null;
      }

      return newCount >= maxClicks ? 0 : newCount;
    });
  };

  // Effect to handle decrement logic after user stops clicking
  useEffect(() => {
    if (clicksCount > 0) {
      decrementInterval.current = setInterval(() => {
        setClicksCount((prevCount) => {
          const newCount = Math.max(0, prevCount - 1);
          if (newCount === 0 && decrementInterval.current) {
            clearInterval(decrementInterval.current);
            decrementInterval.current = null;
          }
          return newCount;
        });
      }, decrementIntervalMs);
    }

    return () => {
      if (decrementInterval.current) {
        clearInterval(decrementInterval.current);
        decrementInterval.current = null;
      }
    };
  }, [clicksCount]);

  /* Render */
  const renderTopInfoRows = useMemo(() => {
    const _9Billions = 9000000000;
    const formattedUserTokens = helper.formatNumber(tokens);
    const formattedTokensLiquidity = helper.formatNumber(
      tokensLiquidity || _9Billions
    );

    return (
      <div className="top-info-rows">
        <InfoRow
          icon={<GlassIcon />}
          label="Total mined banks"
          value={`${formattedUserTokens} / ${formattedTokensLiquidity}`}
        />
        <InfoRow icon={<StarIcon />} label="Your level" value={1} />
      </div>
    );
  }, [tokens, tokensLiquidity]);

  return (
    <div className="game-page">
      {renderTopInfoRows}

      <CoinsLoop isVisible={isCoinLoopVisible} />

      <div className="game-page-main-content">
        <div className="banka-icon-wrapper">
          {helper.getBankIcon(clicksCount, maxClicks, handleClick)}
        </div>

        <TokensCount />

        <div className="progress-bar-wrapper">
          <ProgressBar progress={clicksCount} max={maxClicks} />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
