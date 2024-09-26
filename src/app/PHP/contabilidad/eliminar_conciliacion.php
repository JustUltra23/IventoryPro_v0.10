<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: DELETE');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir el ID de la conciliación a eliminar
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {

    // Eliminar la conciliación de la base de datos
    $query = "DELETE FROM conciliaciones_bancarias WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Conciliación eliminada correctamente."));
    } else {
        echo json_encode(array("message" => "Error al eliminar la conciliación.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "ID de conciliación no proporcionado."));
}

mysqli_close($conexion);

?>
