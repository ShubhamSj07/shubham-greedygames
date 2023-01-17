import { useDispatch } from "react-redux";
import { selectedColumn, toggleSettings } from "../../redux/actions/actions";
import "./Setting.scss";

const Settings = ({
  colHeaders,
  setColHeaders,
  selectedList,
  setSelectedList,
}) => {
  const dispatch = useDispatch();

  // console.log("COL_HEADERS: ",colHeaders);
  // console.log("SELECTED_LIST: ",selectedList);

  const onDragStart = (e, id) => {
    e.target.classList.add("dragging");
    e.dataTransfer.setData("id", id);
  };

  const onDragEnd = e => {
    e.target.classList.remove("dragging");
  };

  const onDrop = e => {
    let id = e.dataTransfer.getData("id");
    let insertBefore = e.target.getAttribute("data-index");
    let item = colHeaders[id];
    let shuffledArray = [...colHeaders];
    shuffledArray.splice(id, 1);
    shuffledArray.splice(insertBefore, 0, item);
    setColHeaders(shuffledArray);
  };

  const handleSelectFilter = data => {
    let filterText = data;
    if (filterText === "date" || filterText === "app_id") {
      return;
    }
    selectedList.includes(filterText)
      ? setSelectedList(prev => prev.filter(fTxt => fTxt !== filterText))
      : setSelectedList([...selectedList, filterText]);
  };

  const handleChangeClick = () => {
    const filteredResults = colHeaders.filter(item =>
      selectedList.includes(item)
    );
    dispatch(selectedColumn(filteredResults));
    dispatch(toggleSettings());
  };

  const handleCloseClick = () => {
    dispatch(toggleSettings());
  };

  return (
    <div className="settings__container">
      <h5 className="heading">Dimensions and Metrics</h5>
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        className="settings__container__dragDropZone"
      >
        {colHeaders?.map((colName, index) => (
          <div
            className={`settings__container__dragDropZone-btns ${
              selectedList.includes(colName) ? `selected` : null
            }`}
            key={index}
            data-index={index}
            onClick={() => handleSelectFilter(colName)}
            onDragStart={e => onDragStart(e, index)}
            onDragEnd={onDragEnd}
            draggable
          >
            {colName === "app_id"
              ? "App"
              : colName === "requests" || colName === "responses"
              ? `Ad ${colName}`
              : colName}
          </div>
        ))}
      </div>
      <div className="settings__container__actions">
        <div className="cancelBtn" onClick={handleCloseClick}>
          Close
        </div>
        <div className="applyBtn" onClick={handleChangeClick}>
          Apply Change
        </div>
      </div>
    </div>
  );
};

export default Settings;
