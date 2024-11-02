import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import CliniciansVisuals from "./components/CliniciansVisuals";
import Button from "./components/Button";

function App() {
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
      <main className="app-main">
        <Dashboard />
        <CliniciansVisuals />
        <Button />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Netcare Access</p>
      </footer>
    </div>
  );
}

export default App;
