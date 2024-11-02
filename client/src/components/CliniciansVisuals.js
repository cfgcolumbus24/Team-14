import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../styles/CliniciansVisuals.css";
import Button from "./Button";


function CliniciansVisuals(props) {
  // Sample data as an array of objects

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/data/?type=EHR`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPatientData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const [patientData, setPatientData] = React.useState([]);

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

  return (
    <div>
      <h2>Clinicians Page</h2>
      <p>Welcome to the Clinicians dashboard section.</p>
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </div>
      </div>
      <Button />
    </div>
  );
}

export default CliniciansVisuals;
