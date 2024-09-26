<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

// Verificar si se pasó el ID y el nuevo estado en la solicitud
if (isset($data['id']) && isset($data['estado'])) {
    $id = $data['id'];
    $estado = $data['estado'];

    // Actualizar el estado de la solicitud
    $query = "UPDATE pqrs SET estado = '$estado' WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Estado de la solicitud actualizado"));
    } else {
        echo json_encode(array("message" => "No se pudo actualizar la solicitud: " . mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>
