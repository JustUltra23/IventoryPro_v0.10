<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

// Verificar si los datos están completos
if (isset($data['nombre'])) {
    $nombre = $data['nombre'];

    // Insertar en la base de datos
    $query = "INSERT INTO roles (nombre) VALUES ('$nombre')";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Rol creado exitosamente"));
    } else {
        echo json_encode(array("message" => "No se pudo crear el rol: " . mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>
