import React from "react";
import "../styles/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  // Sample data for age groups and individuals served
  const ageGroupData = [
    { name: "0-18", count: 350 },
    { name: "19-35", count: 520 },
    { name: "36-50", count: 480 },
    { name: "51-65", count: 300 },
    { name: "65+", count: 150 },
  ];

  const programData = [
    { name: "ROW One", count: 12721 },
    { name: "Probate", count: 1338 },
    { name: "Dev. Disability", count: 1489 },
    { name: "Forensic", count: 832 },
    { name: "Comm. Crisis", count: 384 },
    { name: "Assessments", count: 390 },
    // { name: "Crisis Stab.", count: 357 },
    // { name: "Miles House", count: 175 },
    { name: "Comm. Mobile", count: 574 },
    // { name: "Outpatient", count: 162 },
  ];

  const COLORS = [
    "#007bff", // Blue
    "#28a745", // Green
    "#dc3545", // Red
    "#ffc107", // Yellow
    "#17a2b8", // Teal
    "#6f42c1", // Purple
    "#e83e8c", // Pink
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Our Impact</h1>

      <div className="dashboard-grid">
        {/* Demographics */}
        <div className="dashboard-card-bar">
          <h2>Demographics Served</h2>
          <div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={ageGroupData}>
                <XAxis dataKey="name">
                  <Label
                    value="Age Group"
                    offset={-6}
                    position="bottom"
                    fontSize={10}
                  />
                </XAxis>
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Programs and Impact */}
        <div className="dashboard-card">
          <h2>Program Reach</h2>
          <p>
            More than 17,000 individuals received face-to-face services across
            our programs in 2023.
          </p>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={programData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label
                >
                  {programData.map((entry, index) => (
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

        {/* Emergency Response */}
        <div className="dashboard-card">
          <h2>Emergency Response</h2>
          <p>
            <span>Calls Handled:</span> 1,500+
          </p>
          <p>
            <span>Response Time:</span> Avg. 10 minutes
          </p>
          <p>
            <span>Success Rate:</span> 95% de-escalation
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
