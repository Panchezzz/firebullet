const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`? WebSocket ������ ������� �� ����� ${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('?? ������ �����������');

  ws.on('message', (message) => {
    console.log('?? �������� ���������:', message.toString());

    // ���������� ��������� ���� ������������ ��������
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('? ������ ����������');
  });
});