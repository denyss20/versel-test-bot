import CoinIcon from "../assets/CoinIcon";

import "./CoinLoop.css";

interface CoinLoopProps {
  isVisible: boolean;
}

interface CoinConfig {
  scale: number;
  rotation: number;
  left: string;
  delay: number;
}

const coinsConfig: CoinConfig[] = [
  { scale: 0.7, rotation: -40, left: "40%", delay: 0.05 },

  { scale: 0.83, rotation: 20, left: "59%", delay: 0.2 },

  { scale: 0.87, rotation: 23, left: "38%", delay: 0.33 },

  { scale: 0.75, rotation: 40, left: "29%", delay: 0.52 },
  { scale: 0.85, rotation: 23, left: "51%", delay: 0.51 },

  { scale: 0.7, rotation: 30, left: "34%", delay: 0.67 },
  { scale: 0.68, rotation: 28, left: "40%", delay: 0.82 },
];

const CoinLoop: React.FC<CoinLoopProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  /* Render */

  const renderAnimation = () => {
    return coinsConfig.map((config, index) => (
      <div
        key={index}
        className="coin"
        style={{
          animationDelay: `${config.delay}s`,
          left: config.left,
        }}
      >
        <CoinIcon
          style={{
            transform: `scale(${config.scale}) rotate(${config.rotation}deg)`,
          }}
        />
      </div>
    ));
  };

  /* Return */

  return (
    <div className="coin-loop-wrapper">
      <div className="coin-loop-inner">{renderAnimation()}</div>
    </div>
  );
};

export default CoinLoop;
