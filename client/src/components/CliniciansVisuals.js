import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "../styles/CliniciansVisuals.css";

function CliniciansVisuals(props) {
  const [patientData, setPatientData] = useState([]);
  const [mitelData, setMitelData] = useState([]);
  const [quickBooksData, setQuickBooksData] = useState([]);
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

  const insuranceData = Object.entries(
    filteredPatientData.reduce((acc, patient) => {
      acc[patient.Insurance] = (acc[patient.Insurance] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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

  const medicationData = Object.entries(
    filteredPatientData.reduce((acc, patient) => {
      acc[patient.Medication] = (acc[patient.Medication] || 0) + 1;
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
              <defs>
                <linearGradient id="colorVisitDate" x1="0" y1="0" x2="0" y2="1">
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
              <Bar dataKey="count" fill="url(#colorVisitDate)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinicians-visuals__card">
          <h2>Patient Diagnoses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={diagnosisData}>
              <defs>
                <linearGradient id="colorDiagnosis" x1="0" y1="0" x2="0" y2="1">
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
              <Bar dataKey="count" fill="url(#colorDiagnosis)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clinicians-visuals__card">
          <h2>Patient Insurance</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={insuranceData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label
                >
                  {insuranceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="clinicians-visuals__card">
          <h2>Patient Medications</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={medicationData}>
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
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CliniciansVisuals;
