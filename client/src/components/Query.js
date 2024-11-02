import React from "react";
import { useState } from "react";

const Query = () => {
    const [input, setInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://api.example.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: input }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error submitting query:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your query"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Query;