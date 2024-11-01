// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CliniciansPage from "./components/Clinicians";
import ITAdminPage from "./components/IT-Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clinicians" element={<CliniciansPage />} />
        <Route path="/it-admin" element={<ITAdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
