import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import CliniciansVisuals from "./components/CliniciansVisuals";
import { useState } from "react";
import Query from "./components/Query";
import Button from "./components/Button";
import ITAdmin from "./components/ITAdmin";
import SearchBar from "./components/SearchBar";

function App() {
  // State to manage the selected component
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  // Function to handle dropdown change
  const handleDropdownChange = (event) => {
    setSelectedComponent(event.target.value);
  };
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <img
            src="netcare_logo.png"
            alt="Netcare Access Logo"
            className="logo"
          />{" "}
          <h1>Netcare Access Dashboard</h1>
          <p className="header-subtitle">
            Empowering Behavioral Healthcare and Emotional Support
          </p>
        </div>
      </header>
      <div className="dropdown-wrapper">
        <div
          className="dropdown-container"
          style={{ textAlign: "center", margin: "20px" }}
        >
          <label htmlFor="component-select">View: </label>
          <select id="component-select" onChange={handleDropdownChange}>
            <option value="Dashboard">Impact Report</option>
            <option value="EHR">Clinician</option>
            <option value="ITAdmin">Admin</option>
            <option value="SearchBar">Search Query</option>
          </select>
        </div>
      </div>

      <main className="app-main">
        {/* Conditionally render components based on selected value */}
        {selectedComponent === "Dashboard" && <Dashboard />}
        {selectedComponent === "EHR" && (
          <CliniciansVisuals selectedComponent={selectedComponent} />
        )}
        {selectedComponent === "ITAdmin" && <ITAdmin />}
        {selectedComponent === "SearchBar" && <SearchBar />}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Netcare Access</p>
      </footer>
    </div>
  );
}
export default App;
