// src/App.js
import React, { useState } from "react";
import "../styles/CliniciansVisuals.css"; // Import your CSS for styling

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [outputText, setOutputText] = useState("Please enter a search term.");

  // Handle the search submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (searchTerm.trim()) {
      setOutputText(`You searched for: ${searchTerm}`);
    } else {
      setOutputText("Please enter a valid search term.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Search Application</h1>
      <div className="output-area">
        <h2>{outputText}</h2>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
      </form>
    </div>
  );
}

export default SearchBar;
