import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const visualizations = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Load and parse the CSV file
        const loadCSV = async () => {
            const response = await fetch('/path/to/yourfile.csv'); // Adjust the path
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);

            // Parse CSV data
            Papa.parse(csv, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    setData(results.data);
                },
            });
        };

        loadCSV();
    }, []);

    return (
        <div>
            <h2>Data Visualization</h2>
            {data.length > 0 && (
                <LineChart width={600} height={300} data={data}>
                    <XAxis dataKey="yourXValue" /> {/* Replace with your actual key */}
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="yourYValue" stroke="#8884d8" /> {/* Replace with your actual key */}
                </LineChart>
            )}
        </div>
    );
};

export default visualizations;
