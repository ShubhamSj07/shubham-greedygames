import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";

import fallbackUI from "../../assets/fallbackUI.svg";
import { FilterByRange } from "../FiltersContainer/FilterByRange";
import { FilterBySearch } from "../FiltersContainer/FilterBySearch";
import {
  calculateTotalCountOfAttr,
  formateAttrValues,
} from "../FiltersContainer/FiltersSwtich";
import "./AnalyticsTable.scss";

const AnalyticsTable = () => {
  const fetchedData = useSelector(state => state.data);
  const hasError = useSelector(state => state.hasError);
  const appList = useSelector(state => state.appList);
  const colHeaders = useSelector(state => state.colHeaders);

  const [type, setType] = useState({
    label: "",
  });
  const [showFiltersBy, setSetShowFiltersBy] = useState({
    search: false,
    range: false,
  });
  const [range, setRange] = useState({
    start: 0,
    end: 0,
  });

  const [query, setQuery] = useState("");
  const [activeAppId, setActiveAppId] = useState("");

  const filteredData = activeAppId
    ? fetchedData.filter(item => item.app_id === activeAppId)
    : range.start
    ? fetchedData.filter(item => {
        return (
          parseInt(item[type.label]) >= range.start &&
          parseInt(item[type.label]) <= range.end
        );
      })
    : fetchedData;

  // console.log("FILTERED_DATA: ", filteredData);

  const handleFilterBy = config => {
    if (filteredData.length > 0) {
      setSetShowFiltersBy(prev => ({
        ...showFiltersBy,
        [config]: !prev[config],
      }));
    }
  };

  return (
    <>
      <div className="analyticsTable__wrapper">
        {filteredData?.length === 0 || hasError ? (
          <div className="analyticsTable__wrapper__hasError">
            <div className="analyticsTable__wrapper__hasError-suggestionImg">
              <img className="error" src={fallbackUI} alt="error" />
            </div>
            <div className="analyticsTable__wrapper__hasError-suggestionText">
              <h3>Hey! Something's off!</h3>
              <p>Try changing your filters or selecting a different date</p>
            </div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                {colHeaders.map((colName, key) => (
                  <th
                    key={key}
                    className="headerCellName"
                    onClick={() => {
                      if (colName !== "app_id") {
                        setType({
                          label: colName,
                        });
                      }
                    }}
                  >
                    <FaFilter />
                    {colName === "app_id" ? (
                      <p onClick={() => handleFilterBy("search")}>App</p>
                    ) : (
                      <p
                        onClick={() => {
                          if (colName === "date") return;
                          handleFilterBy("range");
                        }}
                      >
                        {colName}
                      </p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {filteredData?.length > 0 &&
                  colHeaders.map((key, index) => (
                    <td key={index} className="totalValues">
                      {calculateTotalCountOfAttr(filteredData, key, index)}
                    </td>
                  ))}
              </tr>
              {filteredData?.map((row, rowKey) => (
                <tr key={rowKey}>
                  {colHeaders.map((colName, colKey) => {
                    return (
                      <td key={colKey}>
                        {formateAttrValues(appList, colName, row[colName])}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showFiltersBy?.search && (
        <FilterBySearch
          data={filteredData}
          apps={appList}
          query={query}
          setQuery={setQuery}
          setActiveAppId={setActiveAppId}
          setSetShowFiltersBy={setSetShowFiltersBy}
        />
      )}
      {showFiltersBy?.range && (
        <FilterByRange
          data={filteredData}
          apps={appList}
          min={Math.floor(
            Math.min(...fetchedData.map(item => item[type.label]))
          )}
          max={Math.floor(
            Math.max(...fetchedData.map(item => item[type.label]))
          )}
          activeId={type.label}
          setSetShowFiltersBy={setSetShowFiltersBy}
          setRange={setRange}
        />
      )}
    </>
  );
};

export default AnalyticsTable;
