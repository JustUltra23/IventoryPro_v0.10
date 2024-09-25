<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$fecha_solicitud = $data['fecha_solicitud'];
$materiales = $data['materiales'];

$query = "INSERT INTO solicitudes_compras (fecha_solicitud, materiales) VALUES ('$fecha_solicitud', '$materiales')";

if (mysqli_query($conexion, $query)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>
