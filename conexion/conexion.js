import mysql from 'mysql';

// Configurar la conexión a la base de datos
const conexion = mysql.createConnection({
  host: "localhost",
  database: "dashboard",
  user: "root",
  password: ""
});

// Conectar a la base de datos
conexion.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return; // Salir si no hay conexión
  }
  console.log("Conexión exitosa");

  // Realizar la consulta dentro del callback de conexión exitosa
  const projects = "SELECT * FROM registros";
  conexion.query(projects, (error, lista) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
    } else {
      console.log("Resultados de la consulta:", lista);
    }

    // Cerrar la conexión después de la consulta
    conexion.end((endErr) => {
      if (endErr) {
        console.error("Error al cerrar la conexión:", endErr);
      } else {
        console.log("Conexión cerrada correctamente");
      }
    });
  });
});
