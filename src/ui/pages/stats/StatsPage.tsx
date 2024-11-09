import CoinIcon from "./assets/CoinIcon";
import CopyIcon from "./assets/CopyIcon";
import UserProfileIcon from "./assets/UserProfileIcon";

import "./StatsPage.css";

const StatsPage: React.FC = () => {
  return (
    <div className="container">
      <div className="block-one">
        <div className="icon-background">
          <UserProfileIcon />
        </div>
        <div className="header-ref">
          <div className="total-text">Total referrals</div>
          <div className="total-number">3234</div>
        </div>
      </div>

      <div className="block-two">
        <div className="icon-background coin-icon">
          <CoinIcon />
        </div>
        <div className="header-earned">
          <div className="total-text">Total earned</div>
          <div className="total-number">50 000 000</div>
        </div>
      </div>

      <div className="block-three">
        <input
          type="text"
          className="input-field"
          placeholder="tapbanka.com/ref/12312318942141241212"
        />
        <button className="ref-button">
          Copy the referral link
          <CopyIcon className="copy-icon" />
        </button>
      </div>

      <div className="block-four">
        <div className="ref-conversion">
          <p className="conversion-text">Referrals for conversion:</p>
          <div className="conversion-container">
            <UserProfileIcon color="#828282" width="20" height="20" />
            <p className="statistics">15</p>
          </div>
        </div>
        <div className="ref-total">
          <p className="total-text">1 referral will equate to:</p>
          <div className="conversion-container">
            <CoinIcon width="20" height="20" />
            <p className="statistics">10 000</p>
          </div>
        </div>

        <button className="turn-button">Turn it into coins</button>
      </div>
    </div>
  );
};

export default StatsPage;
