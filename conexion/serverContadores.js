import { WebSocketServer } from 'ws';

// Almacenamiento en memoria de los contadores
let onlineCount = 0;
let offlineCount = 0;

// Servidor WebSocket para contadores
const wssContadores = new WebSocketServer({ port: 8081 });

console.log('Servidor WebSocket de contadores escuchando en el puerto 8081.');

wssContadores.on('connection', (ws) => {
    console.log('Cliente conectado al WebSocket de contadores.');

    // Función para enviar los contadores a los clientes
    const sendCounters = () => {
        const message = JSON.stringify({ onlineCount, offlineCount });
        wssContadores.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
                console.log('Mensaje enviado:', message);
            }
        });
    };

    // Enviar los contadores al cliente cuando se conecta
    sendCounters();

    // Escuchar actualizaciones de estado desde otros servicios
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const { deviceId, status } = data;

        // Actualizar los contadores según el estado recibido
        if (status === 'online') {
            onlineCount++;
            if (offlineCount > 0) offlineCount--; // Ajustar si es necesario
        } else if (status === 'offline') {
            offlineCount++;
            if (onlineCount > 0) onlineCount--; // Ajustar si es necesario
        }

        // Enviar los contadores actualizados a todos los clientes
        sendCounters();
    });
});