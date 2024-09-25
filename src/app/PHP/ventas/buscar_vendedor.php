<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$identificacion = $_GET['identificacion'];

$sql = "SELECT * FROM usuarios WHERE identificacion = '$identificacion'";
$result = mysqli_query($conexion, $sql);

$response = new stdClass();
if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $response->resultado = 'Ok';
        $response->vendedor = mysqli_fetch_assoc($result);
    } else {
        $response->resultado = 'Error';
        $response->mensaje = 'Vendedor no encontrado';
    }
} else {
    $response->resultado = 'Error';
    $response->mensaje = 'Error en la consulta';
}

echo json_encode($response);

mysqli_close($conexion);

?>