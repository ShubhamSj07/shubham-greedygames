import { formatPriceToUSD, monthsList } from "../../utils/exportFormats";

export const calculateTotalCountOfAttr = (filteredData, key) => {
  switch (key) {
    case "date":
      return filteredData.length;
    case "app_id":
      return filteredData.length;
    case "fill rate": {
      const data =
        filteredData.reduce((acc, row) => {
          return acc + (row.requests / row.responses) * 100;
        }, 0) / filteredData.length;
      return (data ? data.toFixed(2) : 0) + "%";
    }
    case "ctr": {
      const data =
        filteredData.reduce((acc, row) => {
          return acc + (row.clicks / row.impressions) * 100;
        }, 0) / filteredData.length;
      return (data ? data.toFixed(2) : 0) + "%";
    }
    case "revenue": {
      return (
        `$` +
        formatPriceToUSD(
          filteredData.reduce((acc, row) => {
            if (!row[key]) return acc;
            return acc + parseInt(row[key]);
          }, 0)
        )
      );
    }
    default:
      // requests, responses, impressions, clicks
      return formatPriceToUSD(
        filteredData.reduce((acc, row) => {
          return acc + parseInt(row[key]);
        }, 0)
      );
  }
};

export const formateAttrValues = (appList, key, paramData) => {
  switch (key) {
    case "app_id":
      const selectedApp = appList.find(app => app.app_id === paramData);
      return selectedApp?.app_name;

    case "date":
      let date = new Date(paramData);
      return `${date.getDate()} ${
        monthsList[date.getMonth()]
      } ${date.getFullYear()}`;

    case "revenue":
      return `$` + paramData?.toFixed(2);

    case "fill rate": {
      return paramData + "%";
    }

    case "ctr": {
      return paramData + "%";
    }

    default:
      return paramData?.toLocaleString("en-US");
  }
};
