const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // Broadcast the message to all clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:5001');