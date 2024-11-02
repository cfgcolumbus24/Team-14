// src/App.js
import React, { useState } from "react";
import "../styles/CliniciansVisuals.css"; // Import your CSS for styling

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [outputText, setOutputText] = useState(
    "Please enter a search query, eg: 'How many patients were diagnosed with anxiety in the last month?'"
  );

  // Function to post JSON to an HTTP API
  const postSearchQuery = async (query) => {
    try {
      const response = await fetch("http://localhost:3001/api/data/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      setOutputText(`${JSON.stringify(data)}`);
    } catch (error) {
      setOutputText(`Error: ${error.message}`);
    }
  };
  
  // Handle the search submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    postSearchQuery(searchTerm);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Search Databases</h1>
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
