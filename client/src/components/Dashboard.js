import React from "react";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard View</h1>

      <div className="dashboard-grid">
        {/*  First Row */}
        <div className="dashboard-card">
          <h2>Total Users</h2>
          <p>15,234</p>
        </div>
        <div className="dashboard-card">
          <h2>New Orders</h2>
          <p>567</p>
        </div>

        {/* Second Row */}
        <div className="dashboard-card">
          <h2>Revenue</h2>
          <p>$120,456</p>
        </div>
        <div className="dashboard-card">
          <h2>Active Subscriptions</h2>
          <p>8,976</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
