// src/components/CliniciansVisuals.js
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
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
        setFilteredPatientData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=mitel`)
      .then((response) => response.json())
      .then((data) => setMitelData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=quickbooks`)
      .then((response) => response.json())
      .then((data) => setQuickBooksData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = () => {
    const filteredData = patientData.filter(
      (patient) =>
        patient.ClientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.Diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatientData(filteredData);
  };

  const visitDateData = Object.entries(
    filteredPatientData.reduce((acc, patient) => {
      const monthYear = new Date(patient.StartVisitDate).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "numeric" }
      );
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const diagnosisData = Object.entries(
    filteredPatientData.reduce((acc, patient) => {
      acc[patient.Diagnosis] = (acc[patient.Diagnosis] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const issueTypeData = Object.entries(
    mitelData.reduce((acc, call) => {
      acc[call.IssueType] = (acc[call.IssueType] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const invoiceStatusData = Object.entries(
    quickBooksData.reduce((acc, invoice) => {
      acc[invoice.Status] = (acc[invoice.Status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  return (
    <div className="clinicians-visuals__container">
      <h1 className="clinicians-visuals__title">Patient Data - At a Glance</h1>
      <div className="clinicians-visuals__grid">
        <div className="clinicians-visuals__card">
          <h2>Patient Visits By Date</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitDateData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinicians-visuals__card">
          <h2>Patient Diagnoses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={diagnosisData}>
              <XAxis dataKey="name" interval={0} />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinicians-visuals__card">
          <h2>Mitel Calls By Issue Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={issueTypeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinicians-visuals__card">
          <h2>QuickBooks Invoices By Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={invoiceStatusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> 
    </div>
  );
}

export default CliniciansVisuals;
