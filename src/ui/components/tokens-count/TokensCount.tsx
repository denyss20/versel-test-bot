import TokenIcon from "./assets/TokenIcon";

import "./tokens-count.css";

const TokensCount = () => {
  return (
    <div className="tokens-count">
      <div className="tokens-count-icon">
        <TokenIcon />
      </div>
      <div className="tokens-count-text">0</div>
    </div>
  );
};

export default TokensCount;
