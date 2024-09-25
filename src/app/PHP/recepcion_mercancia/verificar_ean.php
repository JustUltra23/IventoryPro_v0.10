<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');
header("Content-Type: application/json; charset=UTF-8");

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"));

$ean = $data->ean;

$query = "SELECT COUNT(*) as count FROM productos WHERE codigo_ean = '$ean'";
$resultado = mysqli_query($conexion, $query);

if ($resultado) {
    $row = mysqli_fetch_assoc($resultado);
    $exists = $row['count'] > 0 ? true : false;
    echo json_encode(['existe' => $exists]);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(array("message" => "Error: " . mysqli_error($conexion)));
}

mysqli_close($conexion);
?>
