import React from "react";
import CoinIcon from "../assets/CoinIcon";
import "./Coin.css";

interface CoinProps {
  size: number;
  positionX: number;
}

const Coin: React.FC<CoinProps> = ({ size, positionX }) => {
  return (
    <div
      className="coin"
      style={{
        width: size,
        height: size,
        left: `calc(50% + ${positionX}px)`, // Adjust based on positionX for pyramid effect
      }}
    >
      <CoinIcon />
    </div>
  );
};

export default Coin;
