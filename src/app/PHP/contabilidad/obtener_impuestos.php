<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$query = "SELECT * FROM impuestos";
$result = mysqli_query($conexion, $query);

$impuestos = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $impuestos[] = $row;
    }
    echo json_encode($impuestos);
} else {
    echo json_encode(array("message" => "No se encontraron impuestos."));
}

mysqli_close($conexion);
?>
