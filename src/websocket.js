const WebSocket = require('ws');
const usb = require('usb'); // Replace with 'node-hid' if needed for HID devices

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Find and open the USB device
const DEVICE_VENDOR_ID = 0x1234; // Replace with your device's vendor ID
const DEVICE_PRODUCT_ID = 0x5678; // Replace with your device's product ID

let usbDevice = usb.findByIds(DEVICE_VENDOR_ID, DEVICE_PRODUCT_ID);

if (usbDevice) {
    usbDevice.open();
    console.log('USB device connected.');
} else {
    console.error('USB device not found.');
}

wss.on('connection', (ws) => {
    console.log('Client connected.');

    ws.on('message', (message) => {
        console.log('Received:', message);

        // Example: Send data to USB device
        if (usbDevice && usbDevice.interfaces.length > 0) {
            const interface = usbDevice.interfaces[0];

            if (!interface.claimed) {
                interface.claim(); // Claim the interface if not already claimed
            }

            const endpoint = interface.endpoints.find(ep => ep.direction === 'out');

            if (endpoint) {
                endpoint.transfer(Buffer.from(message), (err) => {
                    if (err) {
                        console.error('Error writing to USB device:', err);
                    } else {
                        console.log('Data sent to USB device.');
                    }
                });
            } else {
                console.error('No OUT endpoint found.');
            }
        } else {
            console.error('USB device not ready.');
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

// Cleanup USB device on server exit
process.on('exit', () => {
    if (usbDevice) {
        usbDevice.close();
        console.log('USB device closed.');
    }
});
