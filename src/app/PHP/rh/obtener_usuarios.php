<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Obtener los usuarios
$query = "SELECT id, identificacion FROM usuarios";
$result = mysqli_query($conexion, $query);

$usuarios = array();

while ($row = mysqli_fetch_assoc($result)) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);

mysqli_close($conexion);

?>
