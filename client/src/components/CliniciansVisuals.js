import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../styles/CliniciansVisuals.css";
import Button from "./Button";

function CliniciansVisuals(props) {

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=ehr`)
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [patientData, setPatientData] = React.useState([]);

  console.log( patientData );

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=mitel`)
      .then((response) => response.json())
      .then((data) => {
        setMitelData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [mitelData, setMitelData] = React.useState([]);


  React.useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=quickbooks`)
      .then((response) => response.json())
      .then((data) => {
        setQuickBooksData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [quickBooksData, setQuickBooksData] = React.useState([]);

  // Data for the patients count by start visit month and year chart
  const visitDateCounts = patientData.reduce((acc, patient) => {
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
  const diagnosisCounts = patientData.reduce((acc, patient) => {
    acc[patient.Diagnosis] = (acc[patient.Diagnosis] || 0) + 1;
    return acc;
  }, {});

  const diagnosisData = Object.keys(diagnosisCounts).map((diagnosis) => ({
    name: diagnosis,
    count: diagnosisCounts[diagnosis],
  }));

  // Data for the Mitel calls by issue type chart
  const issueTypeCounts = mitelData.reduce((acc, call) => {
    acc[call.IssueType] = (acc[call.IssueType] || 0) + 1;
    return acc;
  }, {});

  const issueTypeData = Object.keys(issueTypeCounts).map((issueType) => ({
    name: issueType,
    count: issueTypeCounts[issueType],
  }));

  // Data for the QuickBooks invoices by status chart
  const invoiceStatusCounts = quickBooksData.reduce((acc, invoice) => {
    acc[invoice.Status] = (acc[invoice.Status] || 0) + 1;
    return acc;
  }, {});

  const invoiceStatusData = Object.keys(invoiceStatusCounts).map((status) => ({
    name: status,
    count: invoiceStatusCounts[status],
  }));

  return (
    <div>
      <h1>Patient Data - At a Glance</h1>

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
        <div style={{ width: "600px" }}>
          <BarChart width={600} height={300} data={issueTypeData}>
            <XAxis dataKey="name" />
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
              Mitel Calls by Issue Type
            </text>
          </BarChart>
        </div>
        <div style={{ width: "600px" }}>
          <BarChart width={600} height={300} data={invoiceStatusData}>
            <XAxis dataKey="name" />
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
              QuickBooks Invoices by Status
            </text>
          </BarChart>
        </div>
      </div>
      <Button />
    </div>
  );
}

export default CliniciansVisuals;
