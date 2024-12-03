import React from "react";

function PlaceholderCell(bgColor) {
  return (
    <span className={`placeholder placeholder-glow col-8 ${bgColor}`}></span>
  );
}

export const TablePlaceholder = ({ RowsNo, ColsNo, bgColor }) => {
  return (
    <tbody className="table-dark">
      {[...Array(RowsNo)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(ColsNo)].map((_, colIndex) => (
            <td key={colIndex}>
              <PlaceholderCell bgColor={bgColor} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
