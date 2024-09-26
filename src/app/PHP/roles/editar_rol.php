<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

// Verificar si los datos están completos
if (isset($data['id']) && isset($data['nombre'])) {
    $id = $data['id'];
    $nombre = $data['nombre'];

    // Actualizar el rol en la base de datos
    $query = "UPDATE roles SET nombre = '$nombre' WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Rol actualizado exitosamente"));
    } else {
        echo json_encode(array("message" => "No se pudo actualizar el rol: " . mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>
