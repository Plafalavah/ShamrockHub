const WebSocket = require('ws');
const net = require('net');

// WebSocket server for clients
const wss = new WebSocket.Server({ port: 8080 });

// TCP Client that connects to GNU Radio's TCP Sink
const TCP_PORT = 2000; // Same as configured in GNU Radio TCP Sink
const TCP_HOST = '127.0.0.1'; // Localhost for GNU Radio running on the same machine

// Create a TCP socket
const tcpClient = new net.Socket();

// Connect to the TCP Sink (GNU Radio)
tcpClient.connect(TCP_PORT, TCP_HOST, () => {
    console.log('Successfully connected to TCP Sink on port', TCP_PORT);
    tcpClient.write('Test message from Node.js'); // Send a test message to the GNU Radio TCP Sink
});

// Handle incoming data from the TCP Sink
tcpClient.on('data', (data) => {
    console.log('Received data from GNU Radio:', data.toString()); // Log the received data

    // Forward data to all connected WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data.toString()); // Send data as a string to WebSocket clients
        }
    });
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('WebSocket client connected.');

    // Handle incoming messages from WebSocket clients (optional)
    ws.on('message', (message) => {
        console.log('Message from WebSocket client:', message);
    });

    // Handle WebSocket disconnections
    ws.on('close', () => {
        console.log('WebSocket client disconnected.');
    });
});

// Handle errors in the TCP connection
tcpClient.on('error', (err) => {
    console.error('TCP connection error:', err);
});

// Handle closing the TCP connection
tcpClient.on('close', () => {
    console.log('TCP connection closed.');
});

// Cleanup on server exit
process.on('exit', () => {
    tcpClient.end();
    console.log('TCP connection to GNU Radio closed.');
});
