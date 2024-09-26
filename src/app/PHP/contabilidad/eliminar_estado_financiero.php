<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: DELETE');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir el ID del estado financiero a eliminar
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    // Eliminar el estado financiero de la base de datos
    $query = "DELETE FROM estados_financieros WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Estado financiero eliminado correctamente."));
    } else {
        echo json_encode(array("message" => "Error al eliminar el estado financiero.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "ID de estado financiero no proporcionado."));
}

mysqli_close($conexion);

?>

