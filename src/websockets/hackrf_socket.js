import React, { useEffect, useState } from 'react';

const HackRFWebSocket = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://your-websocket-url');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const requestDevice = async () => {
    try {
      const device = await navigator.usb.requestDevice({ filters: [{ vendorId: "1D50" }] }); // Replace with your device's vendorId
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(0);
      setDevice(device);
      console.log('USB device connected:', device);
    } catch (error) {
      console.error('Error connecting to USB device:', error);
    }
  };

  const sendMessage = async () => {
    if (socket && input) {
      socket.send(input);
      setInput('');
    }

    if (device) {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        await device.transferOut(1, data); // Replace 1 with the correct endpoint number
        console.log('Data sent to USB device');
      } catch (error) {
        console.error('Error sending data to USB device:', error);
      }
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <button onClick={requestDevice}>Connect USB Device</button>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default HackRFWebSocket;