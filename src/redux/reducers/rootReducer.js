import {
  FETCH_API_DATA,
  FETCH_APPS_LIST,
  FETCH_ERROR,
  SELECTED_COLUMN,
  TOGGLE_SETTINGS,
} from "../actions/action.types";

const initialState = {
  data: [],
  appList: [],
  hasError: false,
  showSettings: false,
  colHeaders: [
    "date",
    "app_id",
    "requests",
    "responses",
    "impressions",
    "clicks",
    "revenue",
    "fill rate",
    "ctr",
  ],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_API_DATA:
      return { ...state, data: action.payload, hasError: false };

    case FETCH_APPS_LIST:
      return { ...state, appList: action.payload, hasError: false };

    case FETCH_ERROR:
      return { ...state, hasError: true };

    case TOGGLE_SETTINGS:
      return { ...state, showSettings: !state.showSettings };

    case SELECTED_COLUMN:
      return { ...state, colHeaders: action.payload };

    default:
      return state;
  }
};
