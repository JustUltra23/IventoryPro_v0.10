<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');
header("Content-Type: application/json; charset=UTF-8");

require("../conexion.php");

$query = "SELECT rm.id, t.nombre AS tienda_nombre, p.nombre AS producto_nombre, p.codigo_ean AS ean, rm.cantidad, rm.fecha_recepcion, rm.estado 
          FROM recepcion_mercancia rm
          JOIN tiendas t ON rm.tienda_id = t.id
          JOIN productos p ON rm.producto_id = p.id";
$resultado = mysqli_query($conexion, $query);

if ($resultado) {
    $rows = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(array("message" => "Error: " . mysqli_error($conexion)));
}

mysqli_close($conexion);
?>
