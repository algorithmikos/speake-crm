import Icon from "../Icon";

function StudentTableHeader({
  visibleColumns,
  sortConfig,
  setSortConfig,
  sortedFilteredStudents,
}) {
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  return (
    <thead className="table-dark">
      <tr>
        <th onClick={() => handleSort("studentId")} className="clickable">
          <Icon icon="faIdBadge" />
          {sortConfig.key === "studentId" && (
            <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
          )}
        </th>
        {visibleColumns["Student"] && (
          <th>
            <Icon icon="faGraduationCap" /> Student (
            {sortedFilteredStudents.length})
          </th>
        )}
        {visibleColumns["Student Number"] && <th>Student Number</th>}
        {visibleColumns["Grade"] && (
          <th onClick={() => handleSort("grade")} className="clickable">
            Grade
            {sortConfig.key === "grade" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </th>
        )}

        {visibleColumns["Status"] && (
          <th onClick={() => handleSort("status")} className="clickable">
            Status
            {sortConfig.key === "status" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </th>
        )}

        {visibleColumns["E-Mail"] && <th>E-Mail</th>}

        {visibleColumns["Payment"] && (
          <th onClick={() => handleSort("payment")} className="clickable">
            Payment
            {sortConfig.key === "payment" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </th>
        )}

        {visibleColumns["Source"] && (
          <th onClick={() => handleSort("payment")} className="clickable">
            Source
            {sortConfig.key === "payment" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </th>
        )}
        {visibleColumns["Parent"] && <th>Parent</th>}
        {visibleColumns["Parent Number"] && <th>Parent Number</th>}
        {visibleColumns["Action"] && (
          <th onClick={() => handleSort("action")} className="clickable">
            Action
            {sortConfig.key === "action" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </th>
        )}

        {visibleColumns["Actions"] && (
          <th>
            <Icon icon="faSliders" />
          </th>
        )}
      </tr>
    </thead>
  );
}

export default StudentTableHeader;
