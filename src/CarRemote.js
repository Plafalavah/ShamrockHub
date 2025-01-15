import React, { useState } from 'react';

const WebSocketComponent = () => {
    const [ws, setWs] = useState(null);
    const [message, setMessage] = useState('');

    // Establish WebSocket connection
    const connectWebSocket = () => {
        const socket = new WebSocket('ws://localhost:8080');
        
        socket.onopen = () => {
            console.log('Connected to server.');
            setWs(socket);
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };

        socket.onclose = () => {
            console.log('Disconnected from server.');
            setWs(null);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    const sendMessage = () => {
        if (ws) {
            ws.send(message);
            console.log('Message sent:', message);
        } else {
            console.error('WebSocket connection not established.');
        }
    };

    return (
        <div>
            <button onClick={connectWebSocket}>Connect</button>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendMessage} disabled={!ws}>Send to USB</button>
        </div>
    );
};

export default WebSocketComponent;
