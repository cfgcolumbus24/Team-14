// src/components/CliniciansVisuals.js
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../styles/CliniciansVisuals.css";
import Button from "./Button";

function CliniciansVisuals(props) {
  const [patientData, setPatientData] = useState([]);
  const [mitelData, setMitelData] = useState([]);
  const [quickBooksData, setQuickBooksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatientData, setFilteredPatientData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=ehr`)
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data);
        setFilteredPatientData(data); // Initialize filtered data with all patient data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=mitel`)
      .then((response) => response.json())
      .then((data) => {
        setMitelData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=quickbooks`)
      .then((response) => response.json())
      .then((data) => {
        setQuickBooksData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Search handler
  const handleSearch = () => {
    const filteredData = patientData.filter(patient => 
      patient.ClientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.Diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatientData(filteredData);
  };

  // Data for the patients count by start visit month and year chart
  const visitDateCounts = filteredPatientData.reduce((acc, patient) => {
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
  const diagnosisCounts = filteredPatientData.reduce((acc, patient) => {
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
    <div className="dashboard-container">
      <h1 className="dashboard-title">Patient Data - At a Glance</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card-bar">
          <h2>Patient Visits By Date</h2>
          <BarChart width={500} height={300} data={visitDateData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </div>
        <div className="dashboard-card-bar">
          <h2> Patient Diagnoses</h2>
          <BarChart width={500} height={300} data={diagnosisData}>
            <XAxis dataKey="name" interval={0}/>
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </div>
        <div className="dashboard-card-bar">
          <h2>Mitel Calls By Issue Type</h2>
          <BarChart width={500} height={300} data={issueTypeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </div>
        <div className="dashboard-card-bar">
          <h2>QuickBooks Invoices By Status</h2>
          <BarChart width={500} height={300} data={invoiceStatusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </div>
      </div>
      <Button />
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "300px", fontSize: "16px" }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default CliniciansVisuals;
