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
};

export default helper;
