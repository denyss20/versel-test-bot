import EmptyBank from "../assets/EmptyBank";
import BankIcon1 from "../assets/Bank1";
import BankIcon2 from "../assets/Bank2";
import BankIcon3 from "../assets/Bank3";
import BankIcon4 from "../assets/Bank4";
import BankIcon5 from "../assets/Bank5";
import BankIcon6 from "../assets/Bank6";
import BankIcon7 from "../assets/Bank7";
import BankIcon8 from "../assets/Bank8";
import BankIcon9 from "../assets/Bank9";
import BankIcon10 from "../assets/Bank10";

import "./helper.css";

const helper = {
  // Function to format the number to k, M, B
  formatNumber(num: number): string {
    if (num < 1000) {
      return num.toString();
    } else if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
    } else if (num >= 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + "M";
    } else if (num >= 1000000000 && num <= 9000000000) {
      return (num / 1000000000).toFixed(num % 1000000000 === 0 ? 0 : 1) + "B";
    } else {
      throw new Error("Number exceeds the maximum limit of 9 billion");
    }
  },
  getBankIcon(clicksCount: number, maxClicks: number, handleClick: () => void) {
    const percentage = (clicksCount / maxClicks) * 100;
    console.log({
      percentage,
    });
    if (percentage < 5) return <EmptyBank onClick={handleClick} />;
    if (percentage < 15) return <BankIcon1 onClick={handleClick} />;
    if (percentage < 25) return <BankIcon2 onClick={handleClick} />;
    if (percentage < 35) return <BankIcon3 onClick={handleClick} />;
    if (percentage < 45) return <BankIcon4 onClick={handleClick} />;
    if (percentage < 55) return <BankIcon5 onClick={handleClick} />;
    if (percentage < 65) return <BankIcon6 onClick={handleClick} />;
    if (percentage < 75) return <BankIcon7 onClick={handleClick} />;
    if (percentage < 85) return <BankIcon8 onClick={handleClick} />;
    if (percentage < 95) return <BankIcon9 onClick={handleClick} />;
    else {
      return <BankIcon10 onClick={handleClick} />;
    }
  },
};

export default helper;
