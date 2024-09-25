<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

// Eliminar detalles de la cotización
$query_eliminar_detalles = "DELETE FROM detalles_cotizacion WHERE cotizacion_id = $id";
$result_eliminar_detalles = mysqli_query($conexion, $query_eliminar_detalles);

// Eliminar cotización
$query_eliminar_cotizacion = "DELETE FROM cotizaciones WHERE id = $id";
$result_eliminar_cotizacion = mysqli_query($conexion, $query_eliminar_cotizacion);

if ($result_eliminar_cotizacion) {
    echo json_encode(["resultado" => "Ok", "mensaje" => "Cotización eliminada exitosamente"]);
} else {
    echo json_encode(["resultado" => "Error", "mensaje" => "Error al eliminar la cotización: " . mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>

