import React from "react";
import { useNavigate } from "react-router-dom";

import "./BottomMenu.css";

const BottomMenu: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bottom-menu">
      <div className="menu-item" onClick={() => navigateTo("/")}>
        Game
      </div>
      <div className="menu-item" onClick={() => navigateTo("/stats")}>
        Stats
      </div>
      <div className="menu-item" onClick={() => navigateTo("/wallet")}>
        Wallet
      </div>
      <div className="menu-item" onClick={() => navigateTo("/tasks")}>
        Tasks
      </div>
      <div className="menu-item" onClick={() => navigateTo("/auction")}>
        Auction
      </div>
    </div>
  );
};

export default BottomMenu;
