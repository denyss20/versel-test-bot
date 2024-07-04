import { useState } from "react";
import BottomMenu from "./ui/bottom-bar/BottomBar";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <div className="card">
        <BottomMenu />

        <button onClick={() => setCount((count) => count + 1)}>
          {count} $
        </button>
      </div>
    </div>
  );
}

export default App;
