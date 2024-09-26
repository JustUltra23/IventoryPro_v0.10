<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: DELETE');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "DELETE FROM tiendas WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Tienda eliminada correctamente."));
    } else {
        echo json_encode(array("message" => "Error al eliminar la tienda.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "ID no proporcionado."));
}

mysqli_close($conexion);

?>
