import CircularProgress from "./components/CircularProgress";

import HashtagIcon from "./assets/HashtagIcon";
import PeopleIcon from "./assets/PeopleIcon";
import CoinIcon from "./assets/CoinIcon";
// import FullBankIcon from "./assets/FullBankIcon";

import "./auction-page.css";

const auctionNumber = 4000;
const maxAuctionNumber = 5000;
const progress = (auctionNumber / maxAuctionNumber) * 100;

const AuctionPage: React.FC = () => {
  return (
    <div className="auction-container">
      <div className="top-blocks">
        <div className="info-block">
          <HashtagIcon className="icon-wh" />
          <div className="top-block-content">
            <div className="top-block-text">Auction</div>
            <div className="top-block-number">{auctionNumber}</div>
          </div>
        </div>
        <div className="info-block">
          <PeopleIcon className="icon-wh" />
          <div className="top-block-content">
            <div className="top-block-text">Players</div>
            <div className="top-block-number">50</div>
          </div>
        </div>
      </div>

      <div className="center-card">
        {/* <FullBankIcon /> */}

        <div className="total-banks-text">Bank total:</div>
        <div className="total-banks-number">200 000</div>
        <CircularProgress progress={progress} size={160} strokeWidth={20}>
          <div className="progress-info">
            <div className="progress-title">Biggest bet</div>
            <div className="progress-amount">
              <CoinIcon
                width="16"
                height="10.8"
                style={{ marginRight: "4px" }}
              />
              <span>100 345</span>
            </div>
            <div className="progress-user">yumenoami</div>
          </div>
        </CircularProgress>
      </div>

      <div className="under-text">
        <p>
          Place the highest bet, if no one bets it, you will receive the entire
          amount in the bank.
        </p>
      </div>
      <div className="block-full-info">
        <div className="block-full">
          <p className="bet-text">You bet total:</p>
          <div className="stats-container">
            <CoinIcon width="20" height="20" />
            <p className="stats">833</p>
          </div>
        </div>
        <div className="coin-total">
          <p className="bet-text">Your balance:</p>
          <div className="stats-container">
            <CoinIcon width="20" height="20" />
            <p className="stats">85 322</p>
          </div>
        </div>
        <div className="input-and-button">
          <input
            type="text"
            className="input-count"
            placeholder="More than: 345 599"
          />
          <button className="submit-button">Make bid</button>
        </div>
        <button className="outbid-button">Quick outbid 100 000</button>
      </div>
    </div>
  );
};

export default AuctionPage;
