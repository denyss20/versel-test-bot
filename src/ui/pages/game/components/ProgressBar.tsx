import React from "react";
import "./progress-bar.css";

interface ProgressBarProps {
  progress: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, max }) => {
  // Ensure progress is never greater than max
  const progressValue = Math.min(progress, max);

  const widthPercentage = (progress / max) * 100;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${widthPercentage}%` }}
      ></div>
      <div className="progress-text-container">
        <div className="progress-text">
          {progressValue}/{max}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
