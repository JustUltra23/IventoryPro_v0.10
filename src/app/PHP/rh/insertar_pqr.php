<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['usuario_id'], $data['fo_documento'], $data['fecha'], $data['tipo'], $data['descripcion'], $data['estado'], $data['fo_tienda'])) {

    $usuarioId = $data['usuario_id'];
    $foDocumento = $data['fo_documento'];
    $fecha = $data['fecha'];
    $tipo = $data['tipo'];
    $descripcion = $data['descripcion'];
    $estado = $data['estado'];
    $foTienda = $data['fo_tienda'];

    // Insertar el nuevo PQR en la base de datos
    $query = "INSERT INTO pqrs (usuario_id, fo_documento, fecha, tipo, descripcion, estado, fo_tienda) 
              VALUES ($usuarioId, '$foDocumento', '$fecha', '$tipo', '$descripcion', '$estado', $foTienda)";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "PQR insertado correctamente."));
    } else {
        echo json_encode(array("message" => "Error al insertar el PQR.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);

?>
