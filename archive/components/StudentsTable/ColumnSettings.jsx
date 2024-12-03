function ColumnSettings({ visibleColumns, setVisibleColumns }) {
  const handleColumnToggle = (column) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column],
    });
  };

  return (
    <div
      className="d-flex gap-1 justify-content-center"
      style={{ maxHeight: 31 }}
    >
      <div className="btn-group" data-toggle="buttons"></div>
      <div style={{ maxHeight: 31 }}>
        <div className="btn-group" data-toggle="buttons">
          {Object.keys(visibleColumns).map((column) => (
            <label key={column} className="btn btn-dark btn-sm">
              <input
                type="checkbox"
                checked={visibleColumns[column]}
                onChange={() => handleColumnToggle(column)}
              />{" "}
              {column}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColumnSettings;
