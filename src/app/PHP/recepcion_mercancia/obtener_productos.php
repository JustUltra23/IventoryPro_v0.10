<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');
header("Content-Type: application/json; charset=UTF-8");

require("../conexion.php");

$sql = "SELECT * FROM productos";
$result = mysqli_query($conexion, $sql);

if ($result) {
    $productos = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $productos[] = $row;
    }
    echo json_encode($productos);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(array("mensaje" => "Error al obtener productos"));
}

mysqli_close($conexion);

?>