import {
  FETCH_API_DATA,
  FETCH_APPS_LIST,
  FETCH_ERROR,
  SELECTED_COLUMN,
  TOGGLE_SETTINGS,
} from "./action.types";

export const fetchAnalyticsData = (startD, endD) => async dispatch => {
  try {
    const res = await fetch(
      `https://go-dev.greedygame.com/v3/dummy/report?startDate=${startD}&endDate=${endD}`
    );
    const resData = await res.json();
    if (!resData?.data) {
      dispatch({ type: FETCH_ERROR });
      return;
    }
    // transform data!
    const result = resData.data.map(item => {
      item["fill rate"] = parseInt(
        ((item.requests / item.responses) * 100).toFixed(2)
      );
      item["ctr"] = parseInt(
        ((item.clicks / item.impressions) * 100).toFixed(2)
      );
      return item;
    });
    dispatch({ type: FETCH_API_DATA, payload: result });
  } catch (error) {
    console.log({ error });
    dispatch({ type: FETCH_ERROR });
  }
};

export const fetchAppsList = () => async dispatch => {
  try {
    const res = await fetch("https://go-dev.greedygame.com/v3/dummy/apps");
    const resData = await res.json();
    if (!resData?.data) {
      dispatch({ type: FETCH_ERROR });
      return;
    }
    dispatch({ type: FETCH_APPS_LIST, payload: resData.data });
  } catch (error) {
    dispatch({ type: FETCH_ERROR, payload: true });
  }
};

export const toggleSettings = () => {
  return {
    type: TOGGLE_SETTINGS,
  };
};

export const selectedColumn = cols => {
  return { type: SELECTED_COLUMN, payload: cols };
};
