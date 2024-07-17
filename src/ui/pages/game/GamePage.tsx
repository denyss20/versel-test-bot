import { useState } from "react";

import ProgressBar from "./components/ProgressBar";

import BankaIcon from "./assets/BankaIcon";

import "./game-page.css";

function GamePage() {
  const [count, setCount] = useState(0);

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
