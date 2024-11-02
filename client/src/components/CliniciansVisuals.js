import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../styles/CliniciansVisuals.css";
import Button from "./Button";

function CliniciansVisuals(props) {
  // Sample data as an array of objects
  const patientData = [
    { Diagnosis: "Depression" },
    { Diagnosis: "Social Anxiety" },
    { Diagnosis: "Social Anxiety" }, // Replaced Bipolar Disorder
    { Diagnosis: "PTSD" },
    { Diagnosis: "OCD" },
    { Diagnosis: "ADHD" },
    { Diagnosis: "Depression" },
    { Diagnosis: "Social Anxiety" },
    { Diagnosis: "Social Anxiety" }, // Replaced Bipolar Disorder
    { Diagnosis: "PTSD" },
    { Diagnosis: "Depression" },
    { Diagnosis: "Depression" },
    { Diagnosis: "Social Anxiety" }, // Replaced Bipolar Disorder
    { Diagnosis: "PTSD" },
    { Diagnosis: "Social Anxiety" },
    { Diagnosis: "Depression" },
    { Diagnosis: "Depression" },
    { Diagnosis: "OCD" },
    { Diagnosis: "Depression" },
    { Diagnosis: "Depression" },
  ];

  console.log(fetch("http://localhost:3001/api/data"));

  const [realData, setRealData] = React.useState([]);

  console.log(realData);

  // data for the total patients chart
  const numPatients = [
    {
      name: "Total Patients",
      count: patientData.length,
    },
  ];

  // Data for the patients count by diagnosis chart
  const diagnosisCounts = patientData.reduce((acc, patient) => {
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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
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
