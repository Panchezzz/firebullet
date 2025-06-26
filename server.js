const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server started on port ${PORT}`);
});

const rooms = {}; // { roomId: Set of clients }

wss.on('connection', (ws) => {
  ws.roomId = null;

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.type === 'join') {
        const roomId = data.room;
        ws.roomId = roomId;

        if (!rooms[roomId]) {
          rooms[roomId] = new Set();
        }

        rooms[roomId].add(ws);
        console.log(`Client joined room: ${roomId}`);

      } else if (data.type === 'message') {


        const room = rooms[ws.roomId];
        if (room) {
          for (const client of room) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'message',
                from: data.from,
                payload: data.payload
              }));
            }
          }
        }
      }

    } catch (e) {
      console.error('Invalid message:', msg);
    }
  });

  ws.on('close', () => {
    const roomId = ws.roomId;
    if (roomId && rooms[roomId]) {
      rooms[roomId].delete(ws);
      if (rooms[roomId].size === 0) {
        delete rooms[roomId]; 
      }
      console.log(`Client left room: ${roomId}`);
    }
  });
});