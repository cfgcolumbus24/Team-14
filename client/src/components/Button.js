import React from "react";
function ButtonAPICall() {
  // Function to handle API call for button clicks
  const handleButtonClick = async (buttonType) => {
    const jsonData = {
      type: buttonType,
    };

    try {
      const response = await fetch("http://localhost:3001/api/data/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <h2>Clinicians Page</h2>
      <p>Welcome to the Clinicians dashboard section.</p>
      <div style={{ width: "600px", margin: "auto" }}>
        <Bar data={data} options={options} />
      </div>

      {/* Buttons section */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => handleButtonClick("EHR")}
          style={{ margin: "5px" }}
        >
          EHR
        </button>
        <button
          onClick={() => handleButtonClick("Mytel")}
          style={{ margin: "5px" }}
        >
          Mytel
        </button>
        <button
          onClick={() => handleButtonClick("QuickBooks")}
          style={{ margin: "5px" }}
        >
          QuickBooks
        </button>
      </div>
    </div>
  );
}

export default Clinicians;
