export const monthsList = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export const formatDate = dateStr => {
  const isoString = new Date(dateStr).toISOString();
  const options = { month: "short", day: "numeric", year: "numeric" };
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatPriceToUSD = price => {
  if (price >= 1e9) {
    return (price / 1e9).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (price >= 1e6) {
    return (price / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (price >= 1e3) {
    return (price / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return price;
};
