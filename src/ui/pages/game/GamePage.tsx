import { useCallback, useEffect, useState, useMemo, useRef } from "react";

import useGetUserData from "@hooks/api/get/useGetUserData";
import useGetTokensLiquidityData from "@hooks/api/get/useGetTokensLiquidityData";
import useAddNewToken from "@hooks/api/post/useAddNewToken";

import { useTelegramContext } from "@context/useTelegramContext";
import { useAppContext } from "@context/useAppContext";

import InfoRow from "@ui/components/info-row/InfoRow";
import TokensCount from "@ui/components/tokens-count/TokensCount";
import ProgressBar from "./components/ProgressBar";
import Coin from "./components/Coin";

import helper from "./utils/helper";

import GlassIcon from "./assets/GlassIcon";
import StarIcon from "./assets/StarIcon";

import "./game-page.css";

function GamePage() {
  /* API requests */
  const { getUserDataRequest } = useGetUserData();
  const { getTokensLiquidityDataRequest } = useGetTokensLiquidityData();
  const { addNewTokenRequest } = useAddNewToken();

  /* State */
  const { webApp } = useTelegramContext();
  const { tokensLiquidity, userData } = useAppContext();
  const { tokens } = userData || { tokens: 0 };

  const maxClicks = 500;
  const [clicksCount, setClicksCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const decrementInterval = useRef<NodeJS.Timeout | null>(null);

  const [coins, setCoins] = useState<number[]>([]);
  const isClicking = useRef(false);

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

  // Trigger coin animation sequence
  const triggerCoins = () => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        if (isClicking.current) {
          setCoins((prevCoins) => [...prevCoins, Date.now() + i]);

          // Remove each coin after 1.5 seconds (or the time it takes to reach the bank)
          setTimeout(() => {
            setCoins((prevCoins) => prevCoins.slice(1));
          }, 1500);
        }
      }, i * 300); // Increased delay for larger spacing between coins
    }
  };

  // Click handler for the icon
  const handleClick = () => {
    isClicking.current = true;
    setClicksCount((prevCount) => {
      const newCount = prevCount + 1;
      triggerCoins();

      if (newCount === maxClicks) {
        finishCallback(newCount);
        setIsActive(false);
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

  // Effect to stop coin generation after the user stops clicking
  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => {
        isClicking.current = false;
        setIsActive(false);
      }, 200); // Adjust delay to wait for user inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [isActive]);

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

      {/* Coin animations */}
      {coins.map((coin) => (
        <Coin key={coin} />
      ))}

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
