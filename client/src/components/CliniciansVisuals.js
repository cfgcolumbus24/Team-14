import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../styles/CliniciansVisuals.css";
import Button from "./Button";

function CliniciansVisuals(props) {

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=ehr`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPatientData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [patientData, setPatientData] = React.useState([]);


  React.useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=mitel`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMitelData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [mitelData, setMitelData] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=quickbooks`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuickBooksData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [quickBooksData, setQuickBooksData] = React.useState([]);

  // Filtered data based on the search term
  const filteredData = patientData.filter((patient) =>
    patient.Diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Data for the patients count by start visit month and year chart
  const visitDateCounts = filteredData.reduce((acc, patient) => {
    const visitDate = new Date(patient.StartVisitDate);
    const monthYear = `${visitDate.getMonth() + 1}/${visitDate.getFullYear()}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  const visitDateData = Object.keys(visitDateCounts).map((monthYear) => ({
    name: monthYear,
    count: visitDateCounts[monthYear],
  }));

  // Data for the patients count by diagnosis chart
  const diagnosisCounts = filteredData.reduce((acc, patient) => {
    acc[patient.Diagnosis] = (acc[patient.Diagnosis] || 0) + 1;
    return acc;
  }, {});

  const diagnosisData = Object.keys(diagnosisCounts).map((diagnosis) => ({
    name: diagnosis,
    count: diagnosisCounts[diagnosis],
  }));

  return (
    <div>
      <h1>Patient Data - At a Glance</h1>

      {/* Search bar for filtering */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search by diagnosis"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "300px",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "600px" }}>
          <BarChart width={600} height={300} data={visitDateData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </div>
        <div style={{ width: "600px" }}>
          <BarChart width={600} height={300} data={diagnosisData}>
            <XAxis
              dataKey="name"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#007bff" />
            <text
              x={300}
              y={20}
              textAnchor="middle"
              dominantBaseline="central"
              className="chart-title"
              fill="#ffffff"
            >
              Patient Diagnoses
            </text>
          </BarChart>
        </div>
      </div>
      <Button />
    </div>
  );
}

export default CliniciansVisuals;
