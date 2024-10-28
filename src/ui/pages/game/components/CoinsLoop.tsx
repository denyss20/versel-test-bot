import CoinIcon from "../assets/CoinIcon";

import "./CoinLoop.css";

interface CoinLoopProps {
  isVisible: boolean;
}

const CoinLoop: React.FC<CoinLoopProps> = ({ isVisible }) => {
  return (
    <div className={`coin-loop-wrapper ${isVisible ? "visible" : "hidden"}`}>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="coin"
          style={{
            animationDelay: `${index * 0.1}s`, // Delay each coin by 0.15s
            left: index % 2 === 0 ? "48%" : "52%", // Alternate left and right positions
          }}
        >
          <CoinIcon />
        </div>
      ))}
    </div>
  );
};

export default CoinLoop;
