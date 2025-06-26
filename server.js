const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket signaling server started on port ${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});