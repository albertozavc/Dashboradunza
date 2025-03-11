<?php
include 'conexion.php'; // Incluye la conexión

$sql = "SELECT * FROM registros"; // Consulta a la base de datos
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '<table>';
    echo '<tr><th>ID Registro</th><th>ID Project</th><th>IP Estática</th><th>Status</th><th>Fecha</th></tr>';
    while ($row = $result->fetch_assoc()) {
        echo '<tr>';
        echo '<td>' . $row['idregistro'] . '</td>';
        echo '<td>' . $row['idproject'] . '</td>';
        echo '<td>' . $row['ip_estatica'] . '</td>';
        echo '<td>' . $row['status'] . '</td>';
        echo '<td>' . $row['date'] . '</td>';
        echo '</tr>';
    }
    echo '</table>';
} else {
    echo "No hay registros disponibles.";
}

$conn->close();
?>
