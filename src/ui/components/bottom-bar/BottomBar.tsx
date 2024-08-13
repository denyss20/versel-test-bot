import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BankIcon from "./assets/BankIcon";
import StatsIcon from "./assets/StatsIcon";
import WalletIcon from "./assets/WalletIcon";
import TasksIcon from "./assets/TasksIcon";
import AuctionIcon from "./assets/AuctionIcon";

import "./BottomMenu.css";

// MenuItem component
const MenuItem: React.FC<{
  path: string;
  IconComponent: React.ElementType;
  label: string;
}> = ({ path, IconComponent, label }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div
      className={`menu-item ${isActive ? "active" : ""}`}
      onClick={() => navigate(path)}
    >
      <IconComponent className="icon" fill={isActive ? "#3d8dee" : "#828282"} />
      {label}
    </div>
  );
};

const BottomMenu: React.FC = () => {
  return (
    <div className="bottom-menu">
      <MenuItem path="/" IconComponent={BankIcon} label="Game" />
      <MenuItem path="/auction" IconComponent={AuctionIcon} label="Auction" />
      <MenuItem path="/wallet" IconComponent={WalletIcon} label="Wallet" />
      <MenuItem path="/tasks" IconComponent={TasksIcon} label="Tasks" />
      <MenuItem path="/stats" IconComponent={StatsIcon} label="Stats" />
    </div>
  );
};

export default BottomMenu;
