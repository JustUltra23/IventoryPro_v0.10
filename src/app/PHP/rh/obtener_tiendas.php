<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Obtener las tiendas
$query = "SELECT id, nombre FROM tiendas";
$result = mysqli_query($conexion, $query);

$tiendas = array();

while ($row = mysqli_fetch_assoc($result)) {
    $tiendas[] = $row;
}

echo json_encode($tiendas);

mysqli_close($conexion);

?>
