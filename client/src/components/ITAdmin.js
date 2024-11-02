// src/components/ITAdmin.js
import React, { useState, useEffect } from "react";
import Papa from "papaparse";

function ITAdmin() {
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    // Path to your CSV file
    const csvFilePath = "/path/to/your/data.csv"; // Ensure the file is accessible in `public` or `src`

    Papa.parse(csvFilePath, {
      download: true,
      header: true, // Reads the CSV file's header row
      complete: (result) => {
        console.log(result.data); // Inspect parsed data
        setFinancialData(result.data);
      },
      error: (error) => {
        console.error("Error reading CSV:", error);
      },
    });
  }, []);

  return (
    <div>
      <h1>IT Financial Data</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Year</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Department</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Budget</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Expenditure</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Variance</th>
          </tr>
        </thead>
        <tbody>
          {financialData.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.year}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.department}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>${entry.budget}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>${entry.expenditure}</td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: entry.variance < 0 ? "red" : "green",
                }}
              >
                ${entry.variance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ITAdmin;
