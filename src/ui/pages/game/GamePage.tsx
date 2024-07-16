import { useState } from "react";

import ProgressBar from "./components/ProgressBar";

import "./game-page.css";

function GamePage() {
  const [count, setCount] = useState(0);

  return (
    <div className="game-page">
      <div className="">
        <button onClick={() => setCount((count) => count + 1)}>
          {count} $
        </button>

        <div className="progress-bar-wrapper">
          <ProgressBar progress={count} max={100} />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
