<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$query = "SELECT * FROM inventario_insumos";
$resultado = mysqli_query($conexion, $query);

if ($resultado) {
    $rows = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(array("message" => "Error: " . mysqli_error($conexion)));
}

mysqli_close($conexion);

?>
