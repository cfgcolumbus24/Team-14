// src/components/ITAdmin.js
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import Button from "./Button";
import "../styles/CliniciansVisuals.css";

function ITAdmin() {

  const [patientData, setPatientData] = useState([]);
  const [mitelData, setMitelData] = useState([]);
  const [quickBooksData, setQuickBooksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=ehr`)
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data);
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
      <div className="table-container">
        <div>
          <h2>Mitel Calls by Issue Type</h2>
          <table>
            <thead>
              <tr>
                <th>Issue Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {issueTypeData.map((issue) => (
                <tr key={issue.name}>
                  <td>{issue.name}</td>
                  <td>{issue.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Invoices by Status</h2>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {invoiceStatusData.map((invoice) => (
                <tr key={invoice.name}>
                  <td>{invoice.name}</td>
                  <td>{invoice.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default ITAdmin;
