import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../rtk/slices/filters-slice";

function FilterSection({ payment = true }) {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const viewMode = useSelector((state) => state.UI.viewMode);

  function uncheckAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    dispatch(
      setFilters({
        grades: [],
        actions: [],
        payments: [],
        status: [],
      })
    );
  }

  const handleFilter = (e, filterType) => {
    const filterValue = e.target.name;
    dispatch((dispatch, getState) => {
      const prevSelectedFilters = getState().filters.selectedFilters;

      if (prevSelectedFilters[filterType].includes(filterValue)) {
        // Remove the filter value from the selected filters
        dispatch(
          setFilters({
            ...prevSelectedFilters,
            [filterType]: prevSelectedFilters[filterType].filter(
              (filter) => filter !== filterValue
            ),
          })
        );
      } else {
        // Add the filter value to the selected filters
        dispatch(
          setFilters({
            ...prevSelectedFilters,
            [filterType]: [...prevSelectedFilters[filterType], filterValue],
          })
        );
      }
    });
  };

  const handleGradeFilter = (e) => {
    handleFilter(e, "grades");
  };

  // eslint-disable-next-line
  const handleActionFilter = (e) => {
    handleFilter(e, "actions");
  };

  const handlePaymentFilter = (e) => {
    handleFilter(e, "payments");
  };

  const handleStatusFilter = (e) => {
    handleFilter(e, "status");
  };

  return (
    <div
      className="d-flex gap-1 justify-content-center mb-2"
      style={{
        maxHeight: `${viewMode === "table" ? 38 : "none"}`,
      }}
    >
      {viewMode === "table" || viewMode === "cards" ? (
        <>
          <div className="btn-group" data-toggle="buttons">
            {Object.values(selectedFilters).some(
              (filterArray) => filterArray.length > 0
            ) && (
              <button
                className="btn btn-secondary"
                onClick={uncheckAllCheckboxes}
              >
                Reset Filters
              </button>
            )}
          </div>
          <div style={{ maxHeight: `${viewMode === "table" ? 38 : "none"}` }}>
            <div
              className={`${
                viewMode === "table" ? "btn-group" : "d-flex flex-column gap-1"
              }`}
              data-toggle="buttons"
            >
              <label className="btn btn-primary">
                <input
                  type="checkbox"
                  name="1st secondary"
                  onChange={handleGradeFilter}
                />{" "}
                1st Secondary
              </label>
              <label className="btn btn-primary">
                <input
                  type="checkbox"
                  name="2nd secondary"
                  onChange={handleGradeFilter}
                />{" "}
                2nd Secondary
              </label>
              <label className="btn btn-primary">
                <input
                  type="checkbox"
                  name="3rd secondary"
                  onChange={handleGradeFilter}
                />{" "}
                3rd Secondary
              </label>

              <label className="btn btn-success">
                <input
                  type="checkbox"
                  name="Online"
                  onChange={handleStatusFilter}
                />{" "}
                Online
              </label>
              <label className="btn btn-secondary">
                <input
                  type="checkbox"
                  name="Offline"
                  onChange={handleStatusFilter}
                />{" "}
                Offline
              </label>

              {payment && (
                <>
                  <label className="btn btn-warning">
                    <input
                      type="checkbox"
                      name="Monthly"
                      onChange={handlePaymentFilter}
                    />{" "}
                    Monthly
                  </label>
                  <label className="btn btn-warning">
                    <input
                      type="checkbox"
                      name="per Session"
                      onChange={handlePaymentFilter}
                    />{" "}
                    per Session
                  </label>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column"></div>
      )}
    </div>
  );
}

export default FilterSection;
