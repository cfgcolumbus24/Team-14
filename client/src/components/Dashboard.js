import React from "react";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Impact Dashboard</h1>

      <div className="dashboard-grid">
        {/* Demographics */}
        <div className="dashboard-card">
          <h2>Demographics Served</h2>
          <p>
            <span>Age:</span> 25-65 (majority)
          </p>
          <p>
            <span>Gender:</span> 60% Female, 40% Male
          </p>
          <p>
            <span>Ethnicity:</span> Diverse, reflecting Franklin County
          </p>
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
