<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

// Verificar si los datos están completos
if (isset($data['tienda_id']) && isset($data['fecha_solicitud']) && isset($data['descripcion'])) {
    $tienda_id = $data['tienda_id'];
    $fecha_solicitud = $data['fecha_solicitud'];
    $descripcion = $data['descripcion'];
    $estado = 'creada';

    // Insertar en la base de datos
    $query = "INSERT INTO mantenimiento (tienda_id, fecha_solicitud, descripcion, estado) 
              VALUES ('$tienda_id', '$fecha_solicitud', '$descripcion', '$estado')";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Solicitud creada"));
    } else {
        echo json_encode(array("message" => "No se pudo crear la solicitud: " . mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>
