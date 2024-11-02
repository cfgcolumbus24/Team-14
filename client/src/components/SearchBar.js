// src/App.js
import React, { useState } from "react";
import "./App.css"; // Import your CSS for styling

function App() {
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
    <div className="app-container">
      <div className="output-area">
        <h2>{outputText}</h2>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default App;

