<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Obtener el ID de la URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Recibir los datos JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Comprobar que todos los datos necesarios estén presentes
    if (isset($data['tipo'], $data['descripcion'], $data['estado'], $data['fo_tienda'])) {
        $tipo = $data['tipo'];
        $descripcion = $data['descripcion'];
        $estado = $data['estado'];
        $fo_tienda = $data['fo_tienda']; // Obtener el ID de la tienda

        // Actualizar el PQR en la base de datos
        $query = "UPDATE pqrs 
                  SET tipo = '$tipo', descripcion = '$descripcion', estado = '$estado', fo_tienda = '$fo_tienda' 
                  WHERE id = $id";

        if (mysqli_query($conexion, $query)) {
            echo json_encode(array("message" => "PQR actualizado correctamente."));
        } else {
            echo json_encode(array("message" => "Error al actualizar el PQR.", "error" => mysqli_error($conexion)));
        }
    } else {
        echo json_encode(array("message" => "Datos incompletos."));
    }
} else {
    echo json_encode(array("message" => "ID no proporcionado."));
}

mysqli_close($conexion);

?>
