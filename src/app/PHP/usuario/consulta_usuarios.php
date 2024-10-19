<?php
header('Access-Control-Allow-Origin: *');  // O usa el dominio específico si lo prefieres
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH', 'OPTIONS');  // Métodos permitidos
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$query = "SELECT * FROM usuarios";
$result = mysqli_query($conexion, $query);

$usuarios = array();
while ($row = mysqli_fetch_assoc($result)) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);
?>
