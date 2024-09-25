<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$titular = $data['titular'];
$fecha = $data['fecha'];
$total = $data['total'];
$descripcion = $data['descripcion'];
$detalles = $data['detalles'];

// Insertar la cotización
$query_cotizacion = "INSERT INTO cotizaciones (titular, fecha, total, descripcion) VALUES ('$titular', '$fecha', $total, '$descripcion')";
$result_cotizacion = mysqli_query($conexion, $query_cotizacion);

if ($result_cotizacion) {
    $cotizacion_id = mysqli_insert_id($conexion);

    // Insertar los detalles de la cotización
    foreach ($detalles as $detalle) {
        $producto_id = $detalle['producto_id'];
        $cantidad = $detalle['cantidad'];
        $query_detalle = "INSERT INTO detalles_cotizacion (cotizacion_id, producto_id, cantidad) VALUES ($cotizacion_id, $producto_id, $cantidad)";
        mysqli_query($conexion, $query_detalle);
    }

    echo json_encode(["resultado" => "Ok", "mensaje" => "Cotización creada exitosamente"]);
} else {
    echo json_encode(["resultado" => "Error", "mensaje" => "Error al crear la cotización: " . mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>



