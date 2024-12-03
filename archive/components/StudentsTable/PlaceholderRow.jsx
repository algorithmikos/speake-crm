import React from "react";

function PlaceholderCell() {
  return <span className="placeholder col-8 bg-dark"></span>;
}

function PlaceholderRow({ visibleColumns }) {
  return (
    <tbody>
      {[...Array(10)].map((_, rowIndex) => (
        <tr key={rowIndex} className="placeholder-glow">
          <td>
            <PlaceholderCell />
          </td>

          {Object.keys(visibleColumns).map((column, index) => (
            visibleColumns[column] && (
              <td key={index}>
                <PlaceholderCell />
              </td>
            )
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default PlaceholderRow;
