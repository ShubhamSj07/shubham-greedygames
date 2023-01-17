import { useState } from "react";

export const FilterByRange = ({ setSetShowFiltersBy, setRange, min, max }) => {
  const [values] = useState({
    start: min,
    end: max,
  });
  const [endValue, setEndValue] = useState(values.end);

  const handleRangeChange = e => {
    setEndValue(e.target.value);
  };

  return (
    <div
      className="overlay"
      onClick={() => {
        setSetShowFiltersBy(prev => ({
          ...prev,
          range: false,
        }));
        setRange({ start: 0, end: 0 });
      }}
    >
      <div className="overlay__filters" onClick={e => e.stopPropagation()}>
        <input
          type="range"
          min={values?.start}
          max={values?.end}
          onChange={handleRangeChange}
        />
        <div className="overlay__filters-suggestions">
          <div>{values.start}</div>
          <div>{endValue}</div>
        </div>
        <div className="overlay__filters-footer">
          <button
            className="cancelBtn"
            onClick={() => {
              setSetShowFiltersBy(prev => ({
                ...prev,
                range: false,
              }));
              setRange({ start: 0, end: 0 });
            }}
          >
            Reset
          </button>
          <button
            className="applyBtn"
            onClick={() => {
              setSetShowFiltersBy(prev => ({
                ...prev,
                range: false,
              }));
              setRange({ ...values, end: endValue });
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
