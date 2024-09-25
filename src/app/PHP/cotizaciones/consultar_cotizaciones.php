<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$query_cotizaciones = "SELECT * FROM cotizaciones";
$result_cotizaciones = mysqli_query($conexion, $query_cotizaciones);

$cotizaciones = [];

while ($row = mysqli_fetch_assoc($result_cotizaciones)) {
    $cotizacion_id = $row['id'];

    // Obtener detalles de la cotización
    $query_detalles = "SELECT * FROM detalles_cotizacion WHERE cotizacion_id = $cotizacion_id";
    $result_detalles = mysqli_query($conexion, $query_detalles);

    $detalles = [];
    while ($row_detalle = mysqli_fetch_assoc($result_detalles)) {
        $detalles[] = $row_detalle;
    }

    $row['detalles'] = $detalles;
    $cotizaciones[] = $row;
}

echo json_encode($cotizaciones);

mysqli_close($conexion);
?>

