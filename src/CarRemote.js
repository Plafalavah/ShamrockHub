import React, { useEffect, useState } from "react";
import "./sdr.css"; // Import your CSS file

function App() {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState("Disconnected");

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            setStatus("Connected");
            console.log("WebSocket connection opened.");
        };

        ws.onmessage = (event) => {
            const data = event.data;
            console.log("Received:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.onclose = () => {
            setStatus("Disconnected");
            console.log("WebSocket connection closed.");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="app-container">
            <h1>GNU Radio Data Viewer</h1>
            <p className={`status ${status.toLowerCase()}`}>Status: {status}</p>
            
            <div className="messages-container">
                <h2>Received Data:</h2>
                {messages.length === 0 ? (
                    <p className="no-data">No data received yet.</p>
                ) : (
                    <ul className="message-list">
                        {messages.map((msg, index) => (
                            <li key={index} className="message-item">{msg}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
