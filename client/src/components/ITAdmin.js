// src/components/ITAdmin.js
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Button from "./Button";
import "../styles/table.css";
import "../styles/CliniciansVisuals.css";

function ITAdmin() {
  const [patientData, setPatientData] = useState([]);
  const [mitelData, setMitelData] = useState([]);
  const [quickBooksData, setQuickBooksData] = useState([]);
  const [hrisData, setHrisData] = useState([]);

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

  useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=hris`)
      .then((response) => response.json())
      .then((data) => {
        setHrisData(data);
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

  // Data for the HRIS data by department chart
  const departmentCounts = hrisData.reduce((acc, employee) => {
    acc[employee.Department] = (acc[employee.Department] || 0) + 1;
    return acc;
  }, {});

  const departmentData = Object.keys(departmentCounts).map((department) => ({
    name: department,
    count: departmentCounts[department],
  }));

  // Data for the HRIS data by status chart
  const statusCounts = hrisData.reduce((acc, employee) => {
    acc[employee.Status] = (acc[employee.Status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCounts).map((status) => ({
    name: status,
    count: statusCounts[status],
  }));

  return (
    <div className="clinicians-visuals__container">
      <h1 className="clinicians-visuals__title">Administrative Data</h1>
      <div className="clinicians-visuals__grid">
        <div className="clinicians-visuals__card">
          <h2>QuickBooks Invoices By Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={invoiceStatusData}>
              <defs>
                <linearGradient id="colorQuick" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007bff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#00c6ff" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                interval={0}
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
                height={100}
              />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="url(#colorQuick)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinicians-visuals__card">
          <h2>Mitel Calls By Issue Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={issueTypeData}>
              <defs>
                <linearGradient id="colorMitel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007bff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#00c6ff" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                interval={0}
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
                height={100}
              />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="url(#colorQuick)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinicians-visuals__card">
          <h2>HRIS Data By Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <defs>
                <linearGradient
                  id="colorHRISDepartment"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#007bff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#00c6ff" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                interval={0}
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
                height={100}
              />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="url(#colorHRISDepartment)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinicians-visuals__card">
          <h2>HRIS Data By Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <defs>
                <linearGradient
                  id="colorHRISStatus"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#007bff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#00c6ff" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                interval={0}
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
                height={100}
              />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="url(#colorHRISStatus)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ITAdmin;
