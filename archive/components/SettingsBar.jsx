import React from "react";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
// import { setViewMode } from "../rtk/slices/ui-slice";
import FilterSection from "./StudentsTable/FilterSection";
import ColumnSettings from "./StudentsTable/ColumnSettings";

export const SettingsBar = ({
  searchTerm,
  setSearchTerm,
  searchPlaceholder = "Search...",

  filterButton,
  setFilterButton,
  paymentsFilter,

  columnSettings = true,
  columnButton,
  setColumnButton,
  visibleColumns,
  setVisibleColumns,
}) => {
  const dispatch = useDispatch();
  // const viewMode = useSelector((state) => state.UI.viewMode);

  return (
    <>
      <div className="d-flex justify-content-center m-2">
        <div id="search-field" className="position-relative me-2">
          <input
            className="form-control"
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              aria-label="Close"
              type="button"
              className="btn-close"
              onClick={() => setSearchTerm("")}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></button>
          )}
        </div>
        <div className="btn-group">
          <button
            className="btn btn-dark"
            onClick={() => setFilterButton((prev) => !prev)}
          >
            <Icon title="Filters" icon="faFilter" />
          </button>
          {columnSettings && viewMode === "table" && (
            <button
              className="btn btn-dark"
              onClick={() => setColumnButton((prev) => !prev)}
            >
              <Icon title="Columns" icon="faTableColumns" />
            </button>
          )}
          {viewMode === "cards" && (
            <button
              className="btn btn-dark"
              // onClick={() => dispatch(setViewMode("table"))}
            >
              <Icon title="Table View" icon="faTableList" />
            </button>
          )}
          {viewMode === "table" && (
            <button
              className="btn btn-dark"
              // onClick={() => dispatch(setViewMode("cards"))}
            >
              <Icon title="Card View" icon="faAddressCard" />
            </button>
          )}
        </div>
      </div>
      {filterButton && (
        <FilterSection viewMode={viewMode || ""} payment={paymentsFilter} />
      )}
      {columnButton && viewMode === "table" && (
        <ColumnSettings
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      )}
    </>
  );
};
