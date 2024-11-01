// src/components/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleMenuChange = (event) => {
    const selectedPage = event.target.value;
    if (selectedPage === "clinicians") {
      navigate("/clinicians");
    } else if (selectedPage === "it-admin") {
      navigate("/it-admin");
    }
  };

  return (
    <div>
      <nav style={{ background: "#333", padding: "10px", color: "white" }}>
        <h1 style={{ display: "inline", marginRight: "20px" }}>Dashboard</h1>
        <select onChange={handleMenuChange} style={{ padding: "5px" }}>
          <option value="">Select Page</option>
          <option value="clinicians">Clinicians</option>
          <option value="it-admin">IT-Admin</option>
        </select>
      </nav>
      <div style={{ padding: "20px" }}>
        <h2>Welcome to the Dashboard</h2>
        <p>Select an option from the dropdown menu to navigate.</p>
      </div>
    </div>
  );
}

export default Dashboard;
