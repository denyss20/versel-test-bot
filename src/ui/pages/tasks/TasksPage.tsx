import CoinIcon from "./assets/CoinIcon";
import HeartsIcon from "./assets/HeartsIcon";
import TelegramIcon from "./assets/TelegramIcon";
import XIcon from "./assets/XIcon";
import YoutubeIcon from "./assets/YoutubeIcon";
import TikTokIcon from "./assets/TikTokIcon";

import "./tasks-page.css";

const TasksPage: React.FC = () => {
  return (
    <div className="task-container">
      <div className="task-block">
        <div className="icon-bg">
          <HeartsIcon />
        </div>
        <div className="block-header">
          <div className="task-header">Subscribe all</div>
          <div className="coin-number-container">
            <CoinIcon width="20" height="20" />
            <div className="total-coin">100 000</div>
          </div>
        </div>
        <button className="take-away-button">Take away</button>
      </div>

      <div className="task-block">
        <div className="icon-bg">
          <TelegramIcon />
        </div>
        <div className="block-header">
          <div className="task-header">Subscribe channel</div>
          <div className="coin-number-container">
            <CoinIcon width="20" height="20" />
            <div className="total-coin">50 000 000 999</div>
          </div>
        </div>
        <button className="check-button">Check</button>
      </div>

      <div className="task-block">
        <div className="icon-bg">
          <XIcon />
        </div>
        <div className="block-header">
          <div className="task-header">Subscribe X</div>
          <div className="coin-number-container">
            <CoinIcon width="20" height="20" />
            <div className="total-coin">30 000</div>
          </div>
        </div>
        <button className="check-button">Check</button>
      </div>

      <div className="task-block">
        <div className="icon-bg">
          <YoutubeIcon />
        </div>
        <div className="block-header">
          <div className="task-header">Subscribe YouTube</div>
          <div className="coin-number-container">
            <CoinIcon width="20" height="20" />
            <div className="total-coin">20 000</div>
          </div>
        </div>
        <button className="check-button">Check</button>
      </div>

      <div className="task-block">
        <div className="icon-bg">
          <TikTokIcon />
        </div>
        <div className="block-header">
          <div className="task-header">Subscribe TikTok</div>
          <div className="coin-number-container">
            <CoinIcon width="20" height="20" />
            <div className="total-coin">10 000</div>
          </div>
        </div>
        <button className="check-button">Check</button>
      </div>
    </div>
  );
};

export default TasksPage;
