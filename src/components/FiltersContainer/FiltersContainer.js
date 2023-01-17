import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { RiListSettingsLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  fetchAnalyticsData,
  fetchAppsList,
  toggleSettings,
} from "../../redux/actions/actions";
import { formatDate } from "../../utils/exportFormats";
import DataPicker from "./DatePicker";
import "./FiltersContainer.scss";

export const FiltersContainer = () => {
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  const handleSettingClick = () => {
    dispatch(toggleSettings());
  };

  const handleAPIQuery = e => {
    e.preventDefault();
    dispatch(fetchAnalyticsData(date.start, date.end));
    setShowDatePicker(false);
  };

  useEffect(() => {
    dispatch(fetchAppsList());
  }, [dispatch]);

  return (
    <div className="filters__container">
      <div className="filters__container__toolbar">
        <button
          className="filters__container__toolbar-datePickerBtn"
          onClick={() => setShowDatePicker(true)}
        >
          <FaCalendarAlt />
          {date.start && date.end ? (
            <p>
              {formatDate(date.start)} - {formatDate(date.end)}
            </p>
          ) : (
            <p>Date Picker</p>
          )}
        </button>
        {showDatePicker && (
          <DataPicker
            date={date}
            setStartDate={value => setDate({ ...date, start: value })}
            setEndDate={value => setDate({ ...date, end: value })}
            setShowDatePicker={setShowDatePicker}
            handleAPIQuery={handleAPIQuery}
          />
        )}
        <button
          onClick={handleSettingClick}
          className="filters__container-settingsBtn"
        >
          <RiListSettingsLine className="icon" /> Settings
        </button>
      </div>
    </div>
  );
};
