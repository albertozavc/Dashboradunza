import { WebSocketServer } from 'ws';

// Servidor WebSocket
const wss = new WebSocketServer({ port: 8080 });

// Definir los marcadores con sus respectivas IPs estáticas y nombres
const marcadoresConfig = [
  { latLng: [19.694971, -101.171424], name: 'Corporativo35', ip_estatica: '192.168.200.35' },
  { latLng: [19.694860, -101.171825], name: 'Corporativo38', ip_estatica: '192.168.200.38' },
  { latLng: [19.695141, -101.171690], name: 'Corporativo191', ip_estatica: '192.168.200.191' },
  { latLng: [19.695012, -101.171891], name: 'Corporativo39', ip_estatica: '192.168.200.39' },
];

// Almacenamiento en memoria del estado de los marcadores
const marcadoresEstado = new Map();

// Inicializar el estado de los marcadores (todos fuera de línea por defecto)
marcadoresConfig.forEach((config) => {
  marcadoresEstado.set(config.ip_estatica, { status: 'offline', lastSeen: null });
});

console.log('Servidor WebSocket escuchando en el puerto 8080.');

wss.on('connection', (ws) => {
  console.log('Cliente conectado a WebSocket.');

  // Función para enviar los marcadores al cliente
  const sendMarkers = () => {
    const marcadores = marcadoresConfig.map((config) => {
      const estado = marcadoresEstado.get(config.ip_estatica);
      const color = estado.status === 'online' ? '#00FF00' : '#FF0000'; // Verde si está en línea, rojo si no

      return {
        latLng: config.latLng,
        name: config.name,
        color,
      };
    });

    // Enviar los marcadores al cliente WebSocket
    ws.send(JSON.stringify(marcadores));
  };

  // Enviar los marcadores al cliente cuando se conecta
  sendMarkers();

  // Escuchar actualizaciones de estado desde otros servicios
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const { ip_estatica, status } = data;

      // Validar el estado recibido
      if (status !== 'online' && status !== 'offline') {
        console.error('Estado no válido:', status);
        return;
      }

      // Actualizar el estado del marcador en memoria
      if (marcadoresEstado.has(ip_estatica)) {
        marcadoresEstado.set(ip_estatica, { status, lastSeen: new Date() });
        console.log(`Estado actualizado para ${ip_estatica}:`, status);
      } else {
        console.error(`IP no encontrada en la configuración: ${ip_estatica}`);
      }

      // Enviar los marcadores actualizados a todos los clientes
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          sendMarkers();
        }
      });
    } catch (error) {
      console.error('Error al procesar el mensaje:', error);
    }
  });

  // Manejar errores de conexión
  ws.on('error', (error) => {
    console.error('Error en la conexión WebSocket:', error);
  });

  // Manejar cierre de conexión
  ws.on('close', () => {
    console.log('Cliente desconectado del WebSocket.');
  });
});