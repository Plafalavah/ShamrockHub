const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process"); // To execute hackrf_transfer

const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server started at ws://localhost:8080");

const RAW_FILES_DIR = path.join(__dirname, "src"); // Adjust path if needed

function sendRawInChunks(filePath, ws) {
    console.log(`Streaming ${filePath} to HackRF in chunks...`);

    const fileStats = fs.statSync(filePath);
    const CHUNK_SIZE = 1024 * 1024; // 1 MB per chunk

    const stream = fs.createReadStream(filePath, { highWaterMark: CHUNK_SIZE });
    let fileIndex = 0;

    stream.on("data", (chunk) => {
        console.log(`Sending chunk ${fileIndex + 1}`);
        ws.send(chunk);
        fileIndex += 1;
    });

    stream.on("end", () => {
        console.log("Finished sending all chunks.");
        ws.send(JSON.stringify({ type: "end" })); // End of transmission
    });

    stream.on("error", (error) => {
        console.error("Error streaming file:", error);
        ws.send(JSON.stringify({ type: "error", message: "File streaming failed" }));
    });
}

wss.on("connection", (ws) => {
    console.log("WebSocket client connected.");

    ws.on("message", (message) => {
        console.log("Received message:", message);  // Debugging log
        const request = JSON.parse(message);

        if (request.type === "play" && request.file) {
            const filePath = path.join(RAW_FILES_DIR, request.file);
            if (fs.existsSync(filePath)) {
                console.log(`File ${request.file} exists. Starting to send in chunks.`);
                sendRawInChunks(filePath, ws);
            } else {
                console.log(`File not found: ${request.file}`);
                ws.send(JSON.stringify({ type: "error", message: "File not found" }));
            }
        }
    });

    ws.on("close", () => {
        console.log("WebSocket client disconnected.");
    });
});
