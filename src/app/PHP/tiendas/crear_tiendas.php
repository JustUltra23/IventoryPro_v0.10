<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nombre']) && isset($data['direccion'])) {
    $nombre = $data['nombre'];
    $direccion = $data['direccion'];

    $query = "INSERT INTO tiendas (nombre, direccion) VALUES ('$nombre', '$direccion')";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Tienda creada correctamente."));
    } else {
        echo json_encode(array("message" => "Error al crear la tienda.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);

?>
