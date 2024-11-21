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
const animationCycleDuration = 1800; // Animation loop duration in ms
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldFinishAnimation, setShouldFinishAnimation] = useState(false);

  const stopTimeout = useRef<NodeJS.Timeout | null>(null);
  const decrementInterval = useRef<NodeJS.Timeout | null>(null);

  /* Get users data on load */
  useEffect(() => {
    if (webApp?.initData) {
      getUserDataRequest(webApp.initData);
      getTokensLiquidityDataRequest();
    }
  }, [webApp]);


  // Function to handle finishing the game
  const finishCallback = useCallback(async (tappedTokens: number) => {
    const isSuccess = await addNewTokenRequest(tappedTokens);
    if (isSuccess) setClicksCount(0);
  }, []);

  // Start animation if it's not already running
  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsCoinLoopVisible(true);
      setShouldFinishAnimation(false);
    }
  };

  const handleClick = () => {
    // Start animation only if it isn't already running
    startAnimation();

    // Reset or clear stop timeout on each click
    if (stopTimeout.current) clearTimeout(stopTimeout.current);

    // Schedule to stop the animation if no clicks occur within the duration
    stopTimeout.current = setTimeout(() => {
      setShouldFinishAnimation(true); // Mark to finish the animation after the current cycle
    }, animationCycleDuration);

    // Handle clicks count and finish callback logic
    setClicksCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= maxClicks) {
        finishCallback(newCount);
        return 0;
      }
      return newCount;
    });
  };

  // Effect to handle animation state based on `shouldFinishAnimation`
  useEffect(() => {
    if (shouldFinishAnimation && isAnimating) {
      const finishTimer = setTimeout(() => {
        setIsAnimating(false);
        setIsCoinLoopVisible(false);
      }, animationCycleDuration); // Delay to let the loop finish

      return () => clearTimeout(finishTimer);
    }
  }, [shouldFinishAnimation, isAnimating]);

  // Effect to handle decrement logic when user stops clicking
  useEffect(() => {
    if (clicksCount > 0 && !isAnimating) {
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
  }, [clicksCount, isAnimating]);

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
