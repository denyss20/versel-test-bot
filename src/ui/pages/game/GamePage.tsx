import { useState } from "react";

import "./game-page.css";

function GamePage() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {count} $
        </button>
      </div>
    </div>
  );
}

export default GamePage;
