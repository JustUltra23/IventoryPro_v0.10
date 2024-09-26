<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: DELETE');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Verificar si se ha pasado un ID como parámetro de la URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Eliminar el PQR de la base de datos
    $query = "DELETE FROM pqrs WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "PQR eliminado correctamente."));
    } else {
        echo json_encode(array("message" => "Error al eliminar el PQR.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "ID no proporcionado."));
}

mysqli_close($conexion);
?>
