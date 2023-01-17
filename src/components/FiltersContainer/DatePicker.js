const DataPicker = ({
  handleAPIQuery,
  date,
  setStartDate,
  setEndDate,
  setShowDatePicker,
}) => {
  return (
    <form className="datePicker__wrapper" onSubmit={handleAPIQuery}>
      <div>
        <div className="datePicker__wrapper-label">
          <label htmlFor="startDate">Start Date</label>
        </div>
        <input
          type="date"
          name="startDate"
          min="2021-06-01"
          value={date?.start}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <div className="datePicker__wrapper-label">
          <label htmlFor="endDate">End Date</label>
        </div>
        <input
          type="date"
          name="endDate"
          min="2021-06-01"
          value={date?.end}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
      <div className="datePicker__wrapper-footer">
        <button className="cancelBtn" onClick={() => setShowDatePicker(false)}>
          Cancel
        </button>
        <button className="applyBtn">Search</button>
      </div>
    </form>
  );
};

export default DataPicker;
