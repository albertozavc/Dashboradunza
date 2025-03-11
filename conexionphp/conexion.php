<?php
$host = "localhost"; // Cambia si tu servidor es diferente
$user = "root"; // Usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "dashboard"; // Nombre de tu base de datos

// Conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
