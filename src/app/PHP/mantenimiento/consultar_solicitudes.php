<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');
require("../conexion.php");

$query = "SELECT mantenimiento.*, tiendas.nombre AS nombreTienda FROM mantenimiento JOIN tiendas ON mantenimiento.tienda_id = tiendas.id";
$resultado = mysqli_query($conexion, $query);

if ($resultado) {
    $rows = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode(["message" => "Error: " . mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>
