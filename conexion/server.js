import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const app = express();
app.use(cors());

// Almacenamiento en memoria del estado de los dispositivos
const devices = {};

// Ruta para obtener el estado de los dispositivos (opcional, si necesitas HTTP)
app.get('/status', (req, res) => {
    res.json(devices);
});

// Iniciar servidor HTTP
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP corriendo en http://localhost:${PORT}`);
});

// Servidor WebSocket
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado a WebSocket.');

    // Enviar el estado actual de los dispositivos al cliente cuando se conecta
    ws.send(JSON.stringify(devices));

    // Escuchar mensajes de los dispositivos remotos (heartbeat)
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const { deviceId, status } = data;

        // Actualizar el estado del dispositivo
        devices[deviceId] = { status, lastSeen: new Date() };

        // Enviar el estado actualizado a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(devices));
            }
        });
    });
});