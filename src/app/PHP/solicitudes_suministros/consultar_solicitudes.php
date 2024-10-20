<?php
header('Access-Control-Allow-Origin: *');  // O usa el dominio específico si lo prefieres
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH', 'OPTIONS');  // Métodos permitidos
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$query = "SELECT * FROM solicitudes_compras";
$result = mysqli_query($conexion, $query);

$solicitudes = [];

while ($row = mysqli_fetch_assoc($result)) {
    $solicitudes[] = $row;
}

echo json_encode($solicitudes);

mysqli_close($conexion);
?>

