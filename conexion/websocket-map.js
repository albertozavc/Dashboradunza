// Conexión al WebSocket
const socket = new WebSocket('ws://localhost:8080');

// Referencia al mapa inicializado
const mapElement = $('#map');

// Inicialización del mapa
mapElement.vectorMap({
    map: 'world_mill', // Cambia al mapa que uses
    markers: [],
    markerStyle: {
        initial: {
            fill: '#0000FF',
            stroke: '#FFFFFF',
            "stroke-width": 2,
            r: 7
        }
    }
});

// Escuchar mensajes del WebSocket
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data); // Convertir mensaje en un objeto JSON
    const { latLng, name, color } = data;

    // Validación de datos
    if (!Array.isArray(latLng) || latLng.length !== 2 || !name) {
        console.warn('Datos inválidos:', data);
        return;
    }

    const mapObject = mapElement.vectorMap('get', 'mapObject');
    const markerIndex = mapObject.markers.findIndex(marker => marker.config.name === name);

    // Si el marcador ya existe, actualizarlo
    if (markerIndex !== -1) {
        mapObject.removeMarkers([markerIndex]);
    }

    // Agregar nuevo marcador
    mapObject.addMarker(mapObject.markers.length, {
        latLng: latLng,
        name: name,
        style: {
            initial: {
                fill: color || '#FF0000'
            }
        }
    });

    console.log('Marcador agregado:', { latLng, name, color });
});

// Manejo de errores
socket.addEventListener('error', (error) => {
    console.error('Error en WebSocket:', error.message);
});

socket.addEventListener('open', () => {
    console.log('Conexión WebSocket exitosa.');
});

socket.addEventListener('close', () => {
    console.log('Conexión WebSocket cerrada.');
});
