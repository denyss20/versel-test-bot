import React from "react";

import "./BottomMenu.css"; // You can create a separate CSS file for styling

const BottomMenu: React.FC = () => {
  return (
    <div className="bottom-menu">
      <div className="menu-item">Refs</div>
      <div className="menu-item">Earn</div>
      <div className="menu-item">Tap</div>
      <div className="menu-item">Stats</div>
      <div className="menu-item">Settings</div>
    </div>
  );
};

export default BottomMenu;
