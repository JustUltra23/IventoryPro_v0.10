<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$id = $_GET['id'];

$query = "DELETE FROM mantenimiento WHERE id = $id";
if (mysqli_query($conexion, $query)) {
    echo json_encode(["message" => "Solicitud eliminada"]);
} else {
    echo json_encode(["message" => "Error: " . mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>
