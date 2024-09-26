<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id']) && isset($data['nombre']) && isset($data['direccion'])) {
    $id = $data['id'];
    $nombre = $data['nombre'];
    $direccion = $data['direccion'];

    $query = "UPDATE tiendas SET nombre = '$nombre', direccion = '$direccion' WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Tienda actualizada correctamente."));
    } else {
        echo json_encode(array("message" => "Error al actualizar la tienda.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);

?>
