import WebSocket from 'ws';

const deviceId = 'dispositivo-123'; // Identificador único del dispositivo
const serverUrl = 'ws://localhost:3000'; // URL del servidor WebSocket

// Conectar al servidor WebSocket
const ws = new WebSocket(serverUrl);

ws.on('open', () => {
    console.log('Conectado al servidor WebSocket.');

    // Enviar un heartbeat cada 10 segundos
    setInterval(() => {
        const status = 'online'; // Puedes cambiar esto según el estado real del dispositivo
        ws.send(JSON.stringify({ deviceId, status }));
    }, 10000);
});

ws.on('error', (error) => {
    console.error('Error en la conexión WebSocket:', error);
});