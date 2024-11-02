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

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Our Impact</h1>

      <div className="dashboard-grid">
        {/* Demographics */}
        <div className="dashboard-card">
          <h2>Age Groups Served</h2>
          <div>
            <BarChart width={600} height={300} data={ageGroupData}>
              <XAxis dataKey="name">
                {/* <Label value="Age Group" offset={-10} position="insideBottom" /> */}
              </XAxis>
              <YAxis
              // label={{
              //   value: "Individuals Served",
              //   angle: -90,
              //   position: "centerLeft",
              //   offset: 500,
              // }}
              />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </div>
        </div>

        {/* Programs and Impact */}
        <div className="dashboard-card">
          <h2>Program Reach</h2>
          <p>
            <span>Crisis Line:</span> 10,000+ calls answered
          </p>
          <p>
            <span>Assessments:</span> 5,000+ individuals assessed
          </p>
          <p>
            <span>Residential Services:</span> 200+ beds provided
          </p>
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

        {/* Client Outcomes */}
        <div className="dashboard-card">
          <h2>Client Outcomes</h2>
          <p>
            <span>Symptom Reduction:</span> 70% reported improvement
          </p>
          <p>
            <span>Hospitalization Reduction:</span> 30% decrease
          </p>
          <p>
            <span>Improved Quality of Life:</span> 80% satisfaction
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
