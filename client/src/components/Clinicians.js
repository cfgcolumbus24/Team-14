// src/components/CliniciansPage.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CliniciansPage() {
  // Sample data for the bar chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Patient Visits",
        data: [30, 50, 70, 40, 60, 90],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Patient Visits",
      },
    },
  };

  return (
    <div>
      <h2>Clinicians Page</h2>
      <p>Welcome to the Clinicians dashboard section.</p>
      <div style={{ width: "600px", margin: "auto" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default CliniciansPage;
