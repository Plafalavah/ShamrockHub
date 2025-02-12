import React, { useEffect, useState } from "react";
import "./sdr.css"; // Import your CSS file

function CarRemote() {
    const [status, setStatus] = useState("Disconnected");
    const [ws, setWs] = useState(null);
    const [fileChunks, setFileChunks] = useState([]); // To store the chunks

    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:8080");

        websocket.onopen = () => {
            setStatus("Connected");
            console.log("WebSocket connection opened.");
        };

        websocket.onclose = () => {
            setStatus("Disconnected");
            console.log("WebSocket connection closed.");
        };

        websocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        websocket.onmessage = (event) => {
            console.log("Received message:", event.data);  // Debugging log

            // Check if the received data is a chunk or end signal
            if (event.data instanceof ArrayBuffer) {
                console.log("Received chunk:", event.data); // Log received chunk
                setFileChunks((prevChunks) => [...prevChunks, event.data]);
            } else if (event.data === '{"type":"end"}') {
                console.log("Received end of file signal.");
                const completeFile = new Uint8Array(fileChunks.reduce((acc, chunk) => acc.concat(Array.from(new Uint8Array(chunk))), []));
                console.log("File reassembled:", completeFile);
                // Here you can add your logic to process the complete file.
            }
        };

        setWs(websocket);

        return () => {
            websocket.close();
        };
    }, [fileChunks]);

    const sendCommand = (direction) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            let fileName = "";

            switch (direction) {
                case "up":
                    fileName = "carup.raw";
                    break;
                case "down":
                    fileName = "cardown.raw";
                    break;
                case "left":
                    fileName = "carleft.raw";
                    break;
                case "right":
                    fileName = "carright.raw";
                    break;
                default:
                    console.error("Invalid direction");
                    return;
            }

            console.log(`Playing: ${fileName}`);
            ws.send(JSON.stringify({ type: "play", file: fileName }));
        } else {
            console.error("WebSocket not connected");
        }
    };

    return (
        <div className="app-container">
            <h1>Car Remote</h1>
            <p className={`status ${status.toLowerCase()}`}>Status: {status}</p>

            <div className="controls">
                <button onClick={() => sendCommand("up")}>Up</button>
                <div>
                    <button onClick={() => sendCommand("left")}>Left</button>
                    <button onClick={() => sendCommand("right")}>Right</button>
                </div>
                <button onClick={() => sendCommand("down")}>Down</button>
            </div>
        </div>
    );
}

export default CarRemote;
