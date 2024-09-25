<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$titular = $data['titular'];
$fecha = $data['fecha'];
$total = $data['total'];
$descripcion = $data['descripcion'];
$detalles = $data['detalles'];

// Actualizar la cotización
$query_cotizacion = "UPDATE cotizaciones SET titular = '$titular', fecha = '$fecha', total = $total, descripcion = '$descripcion' WHERE id = $id";
$result_cotizacion = mysqli_query($conexion, $query_cotizacion);

if ($result_cotizacion) {
    // Eliminar detalles existentes
    $query_eliminar_detalles = "DELETE FROM detalles_cotizacion WHERE cotizacion_id = $id";
    mysqli_query($conexion, $query_eliminar_detalles);

    // Insertar nuevos detalles
    foreach ($detalles as $detalle) {
        $producto_id = $detalle['producto_id'];
        $cantidad = $detalle['cantidad'];
        $query_detalle = "INSERT INTO detalles_cotizacion (cotizacion_id, producto_id, cantidad) VALUES ($id, $producto_id, $cantidad)";
        mysqli_query($conexion, $query_detalle);
    }

    echo json_encode(["resultado" => "Ok", "mensaje" => "Cotización actualizada exitosamente"]);
} else {
    echo json_encode(["resultado" => "Error", "mensaje" => "Error al actualizar la cotización: " . mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>

