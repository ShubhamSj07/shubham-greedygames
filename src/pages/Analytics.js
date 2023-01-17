import { useState } from "react";
import { useSelector } from "react-redux";
import AnalyticsTable from "../components/AnalyticsTable/AnalyticsTable";
import { FiltersContainer } from "../components/FiltersContainer/FiltersContainer";
import Settings from "../components/Settings/Settings";
import { Layout } from "../utils/Layout";
import "./Analytics.scss";

function Analytics() {
  const showSettings = useSelector(state => state.showSettings);

  const initialColHeaders = useSelector(state => state.colHeaders);
  const [colHeaders, setColHeaders] = useState(initialColHeaders);
  const [selectedList, setSelectedList] = useState(initialColHeaders);

  // console.log("COL_HEADERS: ",colHeaders);
  // console.log("SELECTED_LIST: ",selectedList);

  return (
    <Layout>
      <div className="analytics__filters">
        <h2 className="heading">Analytics</h2>
        <FiltersContainer />
        {showSettings && (
          <Settings
            colHeaders={colHeaders}
            setColHeaders={setColHeaders}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        )}
      </div>
      <AnalyticsTable />
    </Layout>
  );
}

export default Analytics;
