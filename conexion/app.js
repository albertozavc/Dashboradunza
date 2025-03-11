import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// Configura la conexión a la base de datos
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'registro',
});

// Endpoint para obtener los registros de los pings
app.get('/api/pings', async (req, res) => {
  try {
    // Consulta a la base de datos para obtener los pings
    const [rows] = await db.query('SELECT * FROM pings');
    res.json(rows); // Responde con los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener los pings:', error);
    res.status(500).json({ error: 'Error al obtener los pings' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
