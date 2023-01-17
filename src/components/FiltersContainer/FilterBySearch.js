export const FilterBySearch = ({
  apps,
  query,
  setQuery,
  setActiveAppId,
  setSetShowFiltersBy,
}) => {
  const suggestionsList =
    query === ""
      ? apps
      : apps.filter(
          app => app["app_name"].toLowerCase().indexOf(query.toLowerCase()) > -1
        );

  const clearFilters = () => {
    // setSetShowFiltersBy(false);
    setActiveAppId("");
    setQuery("");
  };

  return (
    <div
      className="overlay"
      onClick={() =>
        setSetShowFiltersBy(prev => ({
          ...prev,
          search: !prev.search,
        }))
      }
    >
      <div className="overlay__filters" onClick={e => e.stopPropagation()}>
        <p>Select App</p>
        <input
          name="query"
          type="text"
          className="query__input"
          placeholder="Type to search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="overlay__filters-suggestions">
          {suggestionsList.map((app, index) => (
            <div key={index} onClick={() => setQuery(app.app_name)}>
              <h5>{app.app_name}</h5>
              <p>{app.app_id}</p>
            </div>
          ))}
        </div>
        <div className="overlay__filters-footer">
          {query && (
            <button className="cancelBtn" onClick={clearFilters}>
              Clear Filter
            </button>
          )}
          <button
            className="applyBtn"
            onClick={() => {
              setActiveAppId(
                apps.filter(app => app["app_name"] === query).length > 0
                  ? apps.filter(app => app["app_name"] === query)[0]["app_id"]
                  : ""
              );
              setSetShowFiltersBy(prev => ({
                ...prev,
                search: !prev.search,
              }));
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
