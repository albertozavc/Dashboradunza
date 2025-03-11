import ping from 'ping';
import WebSocket from 'ws';

const serverUrl = 'ws://localhost:3000'; // URL del servidor WebSocket
const hosts = [
    { host: '192.168.200.35', name: 'Corporativo35' },
    { host: '192.168.200.38', name: 'Corporativo38' },
    { host: '192.168.200.191', name: 'Corporativo191' },
    { host: '192.168.200.39', name: 'Corporativo39' }
];

// Conectar al servidor WebSocket
const ws = new WebSocket(serverUrl);

ws.on('open', () => {
    console.log('Conectado al servidor WebSocket.');

    // Función para verificar el estado de los hosts
    const checkHosts = async () => {
        const pingPromises = hosts.map((host) => ping.promise.probe(host.host, { timeout: 1 }));
        const pingResults = await Promise.all(pingPromises);

        // Enviar el estado de cada host al servidor
        pingResults.forEach((res, index) => {
            const status = res.alive ? 'online' : 'offline';
            const deviceId = hosts[index].name;
            ws.send(JSON.stringify({ deviceId, status }));
        });
    };

    // Verificar los hosts cada 5 segundos
    setInterval(checkHosts, 5000);

    // Verificar los hosts inmediatamente al iniciar
    checkHosts();
});

ws.on('error', (error) => {
    console.error('Error en la conexión WebSocket:', error);
});