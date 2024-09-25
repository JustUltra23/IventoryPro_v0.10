<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: DELETE');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = $data['id'];

    $query = "DELETE FROM inventario_insumos WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Insumo eliminado correctamente."));
    } else {
        echo json_encode(array("message" => "Error al eliminar el insumo.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "ID del insumo no proporcionado."));
}

mysqli_close($conexion);

?>
