const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`? WebSocket сервер запущен на порту ${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('?? Клиент подключился');

  ws.on('message', (message) => {
    console.log('?? Получено сообщение:', message.toString());

    // Отправляем сообщение всем подключенным клиентам
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('? Клиент отключился');
  });
});