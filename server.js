const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server started on port ${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message.toString());

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});